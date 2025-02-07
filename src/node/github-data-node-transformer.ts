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

type ParseReadmeDescriptionReturnValue = {
	descriptionHtml: Nullable<string>;
	exposition: Nullable<string>;
};

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
const PROJECT_CATEGORY_REGEX = /type-([\w.]+)-(\w+)/;
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
): ParseReadmeDescriptionReturnValue {
	const descriptionElement = fragment.querySelector('.projectDesc');
	const descriptionHtml = descriptionElement?.innerHTML?.trim() ?? null;
	const exposition =
		descriptionElement?.getAttribute('data-exposition')?.trim() ?? null;

	if (!isDefined(descriptionHtml)) {
		warn('README description not found');
	}

	if (!isDefined(exposition)) {
		warn('README exposition not found');
	}

	return {
		descriptionHtml,
		exposition,
	};
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

// Extract a project's category from its README
function parseReadmeCategory(
	fragment: DocumentFragment,
): TransformReadmeReturnValue['category'] {
	const badgeImgUrl = fragment
		.querySelector('.projectBadges > img[alt="Project type"]')
		?.getAttribute('src');

	if (!isDefined(badgeImgUrl)) {
		return null;
	}

	const categoryMatches = PROJECT_CATEGORY_REGEX.exec(badgeImgUrl);

	if (!categoryMatches || categoryMatches.length < 3) {
		return null;
	}

	return toTitleCase(categoryMatches[1]);
}

// Parse a project's README to extract its name, description, and category
function transformReadme(
	slug: string,
	owner: string,
	readmeResponse: Queries.GithubDataDataUserRepositoriesNodes['readme'],
): TransformReadmeReturnValue {
	if (!isDefined(readmeResponse?.text)) {
		warn('README not found');

		return {
			name: null,
			descriptionHtml: null,
			exposition: null,
			logoUrl: null,
			category: null,
		};
	}

	const fragment = JSDOM.fragment(readmeResponse.text);
	const { descriptionHtml, exposition } = parseReadmeDescription(fragment);

	return {
		name: parseReadmeName(fragment),
		descriptionHtml,
		exposition,
		logoUrl: parseReadmeLogoUrl(slug, owner, fragment),
		category: parseReadmeCategory(fragment),
	};
}

// Transform the languages object into a simple array of strings
function transformLanguages(
	languagesResponse: Queries.GithubDataDataUserRepositoriesNodes['languages'],
): string[] {
	const nodes = languagesResponse?.nodes;
	const languages: string[] = [];

	if (!isDefined(nodes)) {
		warn('languages.nodes is undefined');

		return languages;
	}

	for (const node of nodes) {
		if (isDefined(node?.name)) {
			languages.push(node.name);
		} else {
			warn('languages.nodes[].name is undefined');
		}
	}

	return languages.sort();
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

// Return true if the repo should be included in the list of repos
function excludeRepo(
	slug: string,
	githubRepoNode: Queries.GithubDataDataUserRepositoriesNodes,
	readmeInfo: TransformReadmeReturnValue,
) {
	// Skip repos with missing descriptions as these are hard to work with
	if (!isDefined(githubRepoNode.description)) {
		warn(
			'Description not found. Please add a description to the repo on GitHub',
		);

		return true;
	}

	// Skip repos with unknown categories, unless it's the author's profile repo
	if (
		!isDefined(readmeInfo.category) &&
		slug !== SITE_METADATA.author.username.github
	) {
		warn(
			'README project category badge not found. Please add a project category badge to the README',
		);

		return true;
	}

	return false;
}

/**
 * Build a slug for the repo. If the repo is not owned by the author, include the owner in the slug to avoid naming conflicts.
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
	const slug = buildSlug(githubRepoNode.name, githubRepoNode.owner.login);
	const languages = transformLanguages(githubRepoNode?.languages);
	const topics = transformTopics(githubRepoNode?.repositoryTopics);
	const createdAt = new Date(githubRepoNode.createdAt);
	const updatedAt = new Date(githubRepoNode.updatedAt);
	const readmeInfo = transformReadme(
		slug,
		githubRepoNode.owner.login,
		githubRepoNode.readme,
	);
	// Use the name from the README if it exists as it's more likely to be formatted correctly
	const name = readmeInfo.name || toTitleCase(githubRepoNode.name);

	if (excludeRepo(slug, githubRepoNode, readmeInfo)) {
		return {
			githubRepo: null,
			readmeText: null,
		};
	}

	// If description is null, it will be caught by excludeRepo
	const description: string = githubRepoNode.description as string;

	const githubRepo: GithubRepoNodeProps = {
		exposition: readmeInfo.exposition,
		createdAt: createdAt,
		description: description,
		descriptionHtml: readmeInfo.descriptionHtml,
		forkCount: githubRepoNode.forkCount,
		homepageUrl: githubRepoNode.homepageUrl,
		isFork: githubRepoNode.isFork,
		languages: languages,
		logoUrl: readmeInfo.logoUrl,
		licenseInfo: githubRepoNode.licenseInfo,
		name,
		openGraphImageUrl: githubRepoNode.openGraphImageUrl,
		owner: githubRepoNode.owner.login,
		slug,
		stargazerCount: githubRepoNode.stargazerCount,
		topics,
		category: {
			color: getProjectCategoryColor(readmeInfo.category),
			name: readmeInfo.category,
		},
		updatedAt,
		url: githubRepoNode.url,
		usesCustomOpenGraphImage: githubRepoNode.usesCustomOpenGraphImage,
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
