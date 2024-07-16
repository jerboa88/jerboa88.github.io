/*
	Functions to transform data from the GitHub API into a more usable format
	-------------------------------------------------------------------------
*/

import type { Actions, NodePluginArgs } from 'gatsby';
import { JSDOM } from 'jsdom';
import {
	getGithubRepoVisibility,
	getProjectTypeColor,
	getSiteMetadata,
} from '../common/config-manager';
import {
	EntryVisibility,
	type GithubRepo,
	type UrlString,
} from '../common/types';
import { isDefined, limit, toTitleCase } from '../common/utils';
import { group, groupEnd, info, panic, warn } from './logger';

// Types

type ParseReadmeDescriptionReturnValue = {
	descriptionHtml: string | null;
	commentary: string | null;
};

type TransformReadmeReturnValue = ParseReadmeDescriptionReturnValue & {
	name: string | null;
	logoUrl: string | null;
	type: string | null;
};

type TransformRepoNodeReturnValue = {
	githubRepo: GithubRepo | null;
	readmeText: string | undefined | null;
};

// Constants

const SITE_METADATA = getSiteMetadata();
const GITHUB_CONTENT_BASE_URL: UrlString = 'https://raw.githubusercontent.com';

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

// Extract a project's commentary and description from its README
function parseReadmeDescription(
	fragment: DocumentFragment,
): ParseReadmeDescriptionReturnValue {
	const descriptionElement = fragment.querySelector('.projectDesc');
	const descriptionHtml = descriptionElement?.innerHTML ?? null;
	const commentary =
		descriptionElement?.getAttribute('data-commentary') ?? null;

	if (!isDefined(descriptionHtml)) {
		warn('README description not found');
	}

	if (!isDefined(commentary)) {
		warn('README commentary not found');
	}

	return {
		descriptionHtml,
		commentary,
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

		return new URL(relativeLogoPath, GITHUB_CONTENT_BASE_URL).toString();
	}

	warn('README logo not found');

	return null;
}

// Extract a project's type from its README
function parseReadmeType(
	fragment: DocumentFragment,
): TransformReadmeReturnValue['type'] {
	const badgeImgUrl = fragment
		.querySelector('.projectBadges > img[alt="Project type"]')
		?.getAttribute('src');

	if (!isDefined(badgeImgUrl)) {
		return null;
	}

	const typeMatches = /type-(\w+)-(\w+)/.exec(badgeImgUrl);

	if (!typeMatches || typeMatches.length < 3) {
		return null;
	}

	return toTitleCase(typeMatches[1]);
}

// Parse a project's README to extract its name, description, and type
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
			commentary: null,
			logoUrl: null,
			type: null,
		};
	}

	const fragment = JSDOM.fragment(readmeResponse.text);
	const { descriptionHtml, commentary } = parseReadmeDescription(fragment);

	return {
		name: parseReadmeName(fragment),
		descriptionHtml,
		commentary,
		logoUrl: parseReadmeLogoUrl(slug, owner, fragment),
		type: parseReadmeType(fragment),
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

	// Skip repos with unknown types, unless it's the author's profile repo
	if (
		!isDefined(readmeInfo.type) &&
		slug !== SITE_METADATA.author.username.github
	) {
		warn(
			'README project type badge not found. Please add a project type badge to the README',
		);

		return true;
	}

	// Skip forked repos, as they are less likely to be original projects
	if (githubRepoNode.isFork) {
		info('This is a forked repo');

		return true;
	}

	// Skip markdown repos, as they are usually not remarkable enough to be featured
	if (readmeInfo.type === 'Markdown') {
		info('This is a Markdown repo');

		return true;
	}

	return false;
}

// Transform the repo object into a format we can use
function transformGithubRepoNode(
	githubRepoNode: Queries.GithubDataDataUserRepositoriesNodes,
): TransformRepoNodeReturnValue {
	const slug = githubRepoNode.name;
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

	const githubRepo = {
		commentary: readmeInfo.commentary,
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
		type: {
			color: getProjectTypeColor(readmeInfo.type),
			name: readmeInfo.type,
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
		info('🚫 Skipping repo node creation...');

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
		group();

		const { githubRepo, readmeText } = transformGithubRepoNode(githubRepoNode);

		createGithubRepoNode(
			githubDataNode,
			githubRepo,
			readmeText,
			gatsbyCreateNode,
			createContentDigest,
		);

		groupEnd();
	}

	groupEnd();
}

/**
 * Get a subset of GitHub repos based on visibility and a maximum number of repos
 *
 * @param githubRepos A list of GitHub repos
 * @param minVisibility The minimum visibility level of a repo for to be included in the subset
 * @param maxRepos The maximum number of repos to include in the subset
 * @returns
 */
export function getSubsetOfGithubRepos(
	githubRepos: Queries.GithubRepo[],
	minVisibility: EntryVisibility,
	maxRepos: number,
) {
	const filteredGithubRepos = githubRepos.filter(
		(githubRepo) => getGithubRepoVisibility(githubRepo.slug) < minVisibility,
	);

	return limit(filteredGithubRepos, maxRepos);
}
