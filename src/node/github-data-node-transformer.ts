/*
	Functions to transform data from the GitHub API into a more usable format
	-------------------------------------------------------------------------
*/

import type { Actions, NodePluginArgs } from 'gatsby';
import { fromError } from 'zod-validation-error';
import {
	PROJECT_METADATA_PATH,
	PROJECT_METADATA_SCHEMA,
} from '../config/constants.ts';
import {
	getProjectCategoryColor,
	getSiteMetadata,
} from '../managers/config.ts';
import type {
	SchemaApplicationCategory,
	SchemaType,
} from '../types/content/projects.ts';
import type { UrlString } from '../types/strings.ts';
import type { Maybe, Nullable } from '../types/utils.ts';
import { ifDefined, isDefined } from '../utils/other.ts';
import { toKebabCase, toTitleCase } from '../utils/strings.ts';
import { getAbsoluteUrl } from '../utils/urls.ts';
import { endLogGroup, info, panic, startLogGroup, warn } from './logger.ts';

// Types

// Fields used to create a GithubRepo node
type GithubRepoNodeProps = Omit<
	Queries.GithubRepo,
	| keyof Queries.Node
	| 'childMarkdownRemark'
	| 'childrenMarkdownRemark'
	| 'children'
	| 'id'
	| 'internal'
	| 'parent'
>;

type ParseMetadataReturnValue = {
	name: Nullable<string>;
	background?: Nullable<string>;
	logoPath?: Nullable<string>;
	category: Nullable<string>;
	languages: string[];
	technologies: string[];
	tools: string[];
	topics: string[];
	schema: {
		type?: Nullable<SchemaType>;
		applicationCategory?: Nullable<SchemaApplicationCategory>;
		operatingSystem?: Nullable<string>;
	};
};

// Return values for the transformRepoNode function
type TransformRepoNodeReturnValue = {
	githubRepo: Nullable<GithubRepoNodeProps>;
	readmeText: Maybe<Nullable<string>>;
};

// Constants

const SITE_METADATA = getSiteMetadata();
const GITHUB_CONTENT_BASE_URL: UrlString =
	'https://raw.githubusercontent.com' as const;

// Functions

/**
 * Parse a project's metadata JSON file to extract background, category, languages, and more.
 *
 * @param projectMetadataResponse - The response from the GitHub GraphQL API for the repository's project metadata file
 * @returns An object containing the parsed project metadata
 */
function parseProjectMetadata(
	projectMetadataResponse: Queries.GithubDataDataUserRepositoriesNodes['projectMetadata'],
): ParseMetadataReturnValue {
	const metadataText = projectMetadataResponse?.text;

	if (!isDefined(metadataText)) {
		warn(
			`${PROJECT_METADATA_PATH} not found, but it is required. Please add it to the GitHub repo`,
		);

		return {
			name: null,
			background: null,
			logoPath: null,
			category: null,
			languages: [],
			technologies: [],
			tools: [],
			topics: [],
			schema: {
				type: null,
				applicationCategory: null,
				operatingSystem: null,
			},
		};
	}

	const metadata: unknown = JSON.parse(metadataText);
	const parseResult = PROJECT_METADATA_SCHEMA.safeParse(metadata);

	if (!parseResult.success) {
		panic(fromError(parseResult.error));
	}

	const { background, logoPath, schema, ...remainingProps } = parseResult.data;

	// Reconstruct the object using conditional properties because Zod doesn't support exactOptionalPropertyTypes
	return {
		...remainingProps,
		...ifDefined({ background }),
		...ifDefined({ logoPath }),
		schema: {
			...ifDefined({ type: schema?.type }),
			...ifDefined({ applicationCategory: schema?.applicationCategory }),
			...ifDefined({ operatingSystem: schema?.operatingSystem }),
		},
	};
}

/**
 * Transform the languages object into a simple array of strings and add any additional languages passed in.
 *
 * @param languagesResponse The languages object from the GitHub API.
 * @param additionalLanguages Any additional languages to add to the list.
 * @returns A sorted array of strings representing the languages.
 */
function transformLanguages(
	languagesResponse: Queries.GithubDataDataUserRepositoriesNodes['languages'],
	additionalLanguages: string[],
): string[] {
	const nodes = languagesResponse?.nodes;
	const languages = new Set(additionalLanguages);

	if (isDefined(nodes)) {
		for (const node of nodes) {
			if (isDefined(node?.name)) {
				languages.add(node.name);
			} else {
				warn('languages.nodes[].name is undefined');
			}
		}
	} else {
		warn('languages.nodes is undefined');
	}

	return Array.from(languages).sort();
}

/**
 * Transform a logo path into an absolute URL.
 *
 * @param owner The owner of the repository.
 * @param slug The slug of the repository.
 * @param logoPath The logo path from the project metadata.
 * @returns The absolute URL of the logo, or null if the logo path is not defined.
 */
function transformLogoPath(
	owner: string,
	slug: string,
	logoPath: Maybe<Nullable<string>>,
): Nullable<string> {
	if (isDefined(logoPath)) {
		if (logoPath.startsWith('http')) {
			return logoPath;
		}

		const relativeLogoPath = `${owner}/${slug}/HEAD/${logoPath}`;

		return getAbsoluteUrl(relativeLogoPath, GITHUB_CONTENT_BASE_URL).toString();
	}

	warn(`logoPath not found in ${PROJECT_METADATA_PATH}`);

	return null;
}

/**
 * Transform the topics (tags) object into a simple array of strings
 *
 * @remarks
 *
 * GitHub calls this field `topics`, but we rename it to `tags` to prevent confusion with the `topics` field extracted from project READMEs.
 *
 * @param topicsResponse The topics object from the GitHub API.
 * @returns A sorted array of strings representing the topics.
 */
function transformTags(
	topicsResponse: Queries.GithubDataDataUserRepositoriesNodes['repositoryTopics'],
): string[] {
	const nodes = topicsResponse?.nodes;
	const topics: string[] = [];

	if (!isDefined(nodes)) {
		warn('repositoryTopics.nodes is undefined');

		return topics;
	}

	for (const node of nodes) {
		if (isDefined(node?.topic?.name)) {
			topics.push(node.topic?.name);
		} else {
			warn('repositoryTopics.nodes[].topic.name is undefined');
		}
	}

	return topics.sort();
}

/**
 * A filter function for a GitHub repo project. Returns true if the repo should be excluded from the list of repos
 *
 * @param slug The slug of the repo on GitHub
 * @param description The description of the repo on GitHub
 * @param category The category of the repo
 * @returns True if the repo should be excluded from the list of repos, false otherwise
 */
function doExcludeRepo(
	slug: string,
	description: string,
	category: string,
): description is string;
function doExcludeRepo(
	slug: string,
	description: Nullable<string>,
	category: Nullable<string>,
): description is null;
function doExcludeRepo(
	slug: string,
	description: Nullable<string>,
	category: Nullable<string>,
): boolean {
	// Skip repos with missing descriptions as these are hard to work with
	if (!isDefined(description)) {
		warn(
			'description not found, but it is required. Please add one to the GitHub repo',
		);

		return true;
	}

	// Skip repos with unknown categories, unless it's the author's profile repo
	if (!isDefined(category) && slug !== SITE_METADATA.author.username.github) {
		warn(
			`category not found, but it is required. Please add one to ${PROJECT_METADATA_PATH}`,
		);

		return true;
	}

	return false;
}

/**
 * Build a unique slug for the repo
 *
 * @param name The name of the repo on GitHub
 * @param ownerUsername The username of the owner of the repo on GitHub
 * @returns A unique slug for the repo
 */
function buildSlug(name: string, ownerUsername: string) {
	const defaultSlug = toKebabCase(name);

	// If the repo is not owned by the author, include the owner in the slug to avoid naming conflicts
	if (ownerUsername !== SITE_METADATA.author.username.github) {
		return `${ownerUsername}/${defaultSlug}`;
	}

	return defaultSlug;
}

// Transform the repo object into a format we can use
function transformGithubRepoNode(
	githubRepoNode: Queries.GithubDataDataUserRepositoriesNodes,
): TransformRepoNodeReturnValue {
	const {
		name: repoName,
		owner: { login: repoOwnerUsername },
		repositoryTopics: repoTags,
		createdAt: repoCreatedAt,
		updatedAt: repoUpdatedAt,
		projectMetadata: repoProjectMetadata,
		readme: repoReadme,
		description: repoDescription,
		languages: repoLanguages,
		...remainingRepoProps
	} = githubRepoNode;
	const slug = buildSlug(repoName, repoOwnerUsername);
	const {
		name: metadataName,
		category: metadataCategory,
		languages: metadataLanguages,
		logoPath: metadataLogoPath,
		...remainingMetadataProps
	} = parseProjectMetadata(repoProjectMetadata);

	if (doExcludeRepo(slug, repoDescription, metadataCategory)) {
		return {
			githubRepo: null,
			readmeText: null,
		};
	}

	const githubRepo: GithubRepoNodeProps = {
		...remainingRepoProps,
		...remainingMetadataProps,
		createdAt: repoCreatedAt,
		description: repoDescription,
		languages: transformLanguages(repoLanguages, metadataLanguages),
		logoUrl: transformLogoPath(repoOwnerUsername, repoName, metadataLogoPath),
		tags: transformTags(repoTags),
		// Use the name from the README if it exists as it's more likely to be formatted correctly
		name: metadataName || toTitleCase(repoName),
		slug,
		updatedAt: repoUpdatedAt,
		owner: repoOwnerUsername,
		category: {
			color: getProjectCategoryColor(metadataCategory),
			name: metadataCategory,
		},
	};

	return {
		githubRepo,
		readmeText: githubRepoNode.readme?.text,
	};
}

// Create a new node for a repo
function createGithubRepoNode(
	parentNode: Queries.GithubData,
	githubRepo: TransformRepoNodeReturnValue['githubRepo'],
	readmeText: TransformRepoNodeReturnValue['readmeText'],
	gatsbyCreateNode: Actions['createNode'],
	createContentDigest: NodePluginArgs['createContentDigest'],
) {
	if (!isDefined(githubRepo)) {
		warn('🚫 Skipping repo node creation...');

		return;
	}

	gatsbyCreateNode({
		...githubRepo,
		id: `${githubRepo.slug}-GithubRepo`,
		parent: parentNode.id,
		internal: {
			type: 'GithubRepo',
			mediaType: 'text/markdown',
			content: readmeText ?? '',
			contentDigest: createContentDigest(readmeText ?? ''),
		},
	});
}

// Transform the GitHub API response into a simple array of repos
export function transformGithubDataNode(
	githubDataNode: Queries.GithubData,
	gatsbyCreateNode: Actions['createNode'],
	createContentDigest: NodePluginArgs['createContentDigest'],
) {
	const githubRepoNodes = githubDataNode.data?.user?.repositories.nodes;

	if (!isDefined(githubRepoNodes)) {
		panic('node.data.user.repositories.nodes is undefined');
	}

	for (const githubRepoNode of githubRepoNodes) {
		if (!isDefined(githubRepoNode)) {
			panic('node.data.user.repositories.nodes[] is undefined');
		}

		info(`Transforming GithubRepo node for '${githubRepoNode.name}'...`);
		startLogGroup();

		const { githubRepo, readmeText } = transformGithubRepoNode(githubRepoNode);

		createGithubRepoNode(
			githubDataNode,
			githubRepo,
			readmeText,
			gatsbyCreateNode,
			createContentDigest,
		);

		endLogGroup();
	}
}
