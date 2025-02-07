/*
	Functions to transform data from the GitHub API into a more usable format
	-------------------------------------------------------------------------
*/

import type { Actions, NodePluginArgs } from 'gatsby';
import { JSDOM } from 'jsdom';
import {
	getProjectCategoryColor,
	getSiteMetadata,
} from '../managers/config.ts';
import type { UrlString } from '../types/strings.ts';
import type { Maybe, Nullable } from '../types/utils.ts';
import { isDefined } from '../utils/other.ts';
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

// Return values for the transformReadme function
type TransformReadmeReturnValue = {
	name: Nullable<string>;
	descriptionHtml: Nullable<string>;
	logoUrl: Nullable<string>;
	exposition: Nullable<string>;
	category: Nullable<string>;
	languages: string[];
	technologies: string[];
	tools: string[];
	topics: string[];
	schemaType: Nullable<string>;
	schemaApplicationCategory: Nullable<string>;
	schemaOperatingSystem: Nullable<string>;
};

// Return values for the transformRepoNode function
type TransformRepoNodeReturnValue = {
	githubRepo: Nullable<GithubRepoNodeProps>;
	readmeText: Maybe<Nullable<string>>;
};

// Constants

const SITE_METADATA = getSiteMetadata();
const GITHUB_CONTENT_BASE_URL: UrlString = 'https://raw.githubusercontent.com';
const METADATA_REGEX = {
	exposition: buildMetadataRegex('exposition'),
	category: buildMetadataRegex('category'),
	languages: buildMetadataRegex('languages'),
	technologies: buildMetadataRegex('technologies'),
	tools: buildMetadataRegex('tools'),
	topics: buildMetadataRegex('topics'),
	schemaType: buildMetadataRegex('schema:type'),
	schemaApplicationCategory: buildMetadataRegex('schema:applicationCategory'),
	schemaOperatingSystem: buildMetadataRegex('schema:operatingSystem'),
} as const;

// Functions

/**
 * Given a key, build a regex to extract the corresponding metadata entry from a README
 *
 * @param key - The key to extract
 * @returns A regex to extract the corresponding metadata entry from a README
 */
function buildMetadataRegex(key: string) {
	return new RegExp(`\\[meta:${key}\\]: ? # ? \\(([a-zA-Z0-9.,+# ]*?)\\)`);
}

// Extract a project's name from its README
function parseReadmeName(
	fragment: DocumentFragment,
): TransformReadmeReturnValue['name'] {
	const linkElement = fragment.querySelector('.projectName > a');
	const name =
		linkElement?.getAttribute('title') ??
		linkElement?.textContent ??
		fragment.querySelector('.projectName')?.textContent;

	if (isDefined(name)) {
		return name.trim();
	}

	warn('README name not found');

	return null;
}

// Extract a project's exposition and description from its README
function parseReadmeDescription(
	fragment: DocumentFragment,
): TransformReadmeReturnValue['descriptionHtml'] {
	const descriptionHtml =
		fragment.querySelector('.projectDesc')?.innerHTML?.trim() ?? null;

	if (!isDefined(descriptionHtml)) {
		warn('README description not found');
	}

	return descriptionHtml;
}

// Extract a project's logo URL from its README
function parseReadmeLogoUrl(
	slug: string,
	owner: string,
	fragment: DocumentFragment,
): TransformReadmeReturnValue['name'] {
	const logoUrl = fragment.querySelector('.projectLogo')?.getAttribute('src');

	if (isDefined(logoUrl)) {
		if (logoUrl.startsWith('http')) {
			return logoUrl;
		}

		const relativeLogoPath = `${owner}/${slug}/HEAD/${logoUrl}`;

		return getAbsoluteUrl(relativeLogoPath, GITHUB_CONTENT_BASE_URL).toString();
	}

	warn('README logo not found');

	return null;
}

/**
 * Extract a project's metadata from its README
 *
 * @remarks
 *
 * Metadata is stored in the README as reference-style links with the key being the link label and the value being the link destination. The key must be prefixed with `meta:`, e.g. `[meta:key]: # (value)`.
 *
 * @param readmeText - The Markdown text of the README file
 * @param key - The metadata key to extract
 * @param allowMultipleValues - Whether to extract multiple values from the metadata key as an array
 * @returns An array of values if `allowMultipleValues` is `true`, otherwise a single value, or `null` if the metadata key is not found
 */
function parseReadmeMetadata(
	readmeText: string,
	key: keyof typeof METADATA_REGEX,
	allowMultipleValues: true,
): string[];
function parseReadmeMetadata(
	readmeText: string,
	key: keyof typeof METADATA_REGEX,
	allowMultipleValues?: false,
): Nullable<string>;
function parseReadmeMetadata(
	readmeText: string,
	key: keyof typeof METADATA_REGEX,
	allowMultipleValues = false,
): string[] | Nullable<string> {
	const matches = METADATA_REGEX[key].exec(readmeText);

	if (!isDefined(matches) || matches.length < 2) {
		warn(`README ${key} not found`);

		return allowMultipleValues ? [] : null;
	}

	if (allowMultipleValues) {
		return matches[1].split(',').map((item) => item.trim());
	}

	return matches[1].trim();
}

/**
 * Parse a project's README to extract its name, description, and other metadata
 *
 * @param slug - The repository slug (e.g. `my-repo`)
 * @param owner - The repository owner (e.g. `my-username`)
 * @param readmeResponse - The response from the GitHub GraphQL API for the repository's README
 * @returns An object containing the parsed README data
 */
function transformReadme(
	slug: string,
	owner: string,
	readmeResponse: Queries.GithubDataDataUserRepositoriesNodes['readme'],
): TransformReadmeReturnValue {
	const readmeText = readmeResponse?.text;

	if (!isDefined(readmeText)) {
		warn('README not found');

		return {
			name: null,
			descriptionHtml: null,
			logoUrl: null,
			exposition: null,
			category: null,
			languages: [],
			technologies: [],
			tools: [],
			topics: [],
			schemaType: null,
			schemaApplicationCategory: null,
			schemaOperatingSystem: null,
		};
	}

	const fragment = JSDOM.fragment(readmeText);

	return {
		name: parseReadmeName(fragment),
		descriptionHtml: parseReadmeDescription(fragment),
		logoUrl: parseReadmeLogoUrl(slug, owner, fragment),
		exposition: parseReadmeMetadata(readmeText, 'exposition'),
		category: parseReadmeMetadata(readmeText, 'category'),
		languages: parseReadmeMetadata(readmeText, 'languages', true),
		technologies: parseReadmeMetadata(readmeText, 'technologies', true),
		tools: parseReadmeMetadata(readmeText, 'tools', true),
		topics: parseReadmeMetadata(readmeText, 'topics', true),
		schemaType: parseReadmeMetadata(readmeText, 'schemaType'),
		schemaApplicationCategory: parseReadmeMetadata(
			readmeText,
			'schemaApplicationCategory',
		),
		schemaOperatingSystem: parseReadmeMetadata(
			readmeText,
			'schemaOperatingSystem',
		),
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

// Transform the topics object into a simple array of strings
function transformTopics(
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
			'README category not found, but it is required. Please add one to the README',
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
		readme: repoReadme,
		description: repoDescription,
		languages: repoLanguages,
		...remainingRepoProps
	} = githubRepoNode;
	const slug = buildSlug(repoName, repoOwnerUsername);
	const {
		name: readmeName,
		category: readmeCategory,
		languages: readmeLanguages,
		...remainingReadmeProps
	} = transformReadme(slug, repoOwnerUsername, repoReadme);

	if (doExcludeRepo(slug, repoDescription, readmeCategory)) {
		return {
			githubRepo: null,
			readmeText: null,
		};
	}

	const githubRepo: GithubRepoNodeProps = {
		...remainingRepoProps,
		...remainingReadmeProps,
		createdAt: repoCreatedAt,
		description: repoDescription,
		languages: transformLanguages(repoLanguages, readmeLanguages),
		tags: transformTopics(repoTags),
		// Use the name from the README if it exists as it's more likely to be formatted correctly
		name: readmeName || toTitleCase(repoName),
		slug,
		updatedAt: repoUpdatedAt,
		owner: repoOwnerUsername,
		category: {
			color: getProjectCategoryColor(readmeCategory),
			name: readmeCategory,
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
