/*
	Functions to transform data from the GitHub API into a more usable format
	-------------------------------------------------------------------------
*/

import type { Actions, NodePluginArgs } from 'gatsby';
import { JSDOM } from 'jsdom';
import {
	getGithubRepoRulesForSlug,
	getProjectTypeColor,
} from '../common/config-manager';
import type { GithubRepo, UrlString } from '../common/types';
import { isDefined, toTitleCase } from '../common/utilities';
import { group, groupEnd, info, panic, panicOnBuild, warn } from './logger';

// Types

type ReadmeInfo = {
	name: string | null;
	descriptionHtml: string | null;
	logoUrl: string | null;
	type: string | null;
};

type TransformRepoNodeReturnValue = {
	githubRepo: GithubRepo | null;
	readmeText: string | undefined | null;
};

// Constants

const GITHUB_CONTENT_BASE_URL: UrlString = 'https://raw.githubusercontent.com';

// Extract a project's name from its README
function parseReadmeName(fragment: DocumentFragment): ReadmeInfo['name'] {
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

// Extract a project's description from its README as HTML
function parseReadmeDescriptionHtml(
	fragment: DocumentFragment,
): ReadmeInfo['descriptionHtml'] {
	const descriptionHtml = fragment.querySelector('.projectDesc')?.innerHTML;

	if (isDefined(descriptionHtml)) {
		return descriptionHtml.trim();
	}

	warn('README description not found');

	return null;
}

// Extract a project's logo URL from its README
function parseReadmeLogoUrl(
	slug: string,
	owner: string,
	fragment: DocumentFragment,
): ReadmeInfo['name'] {
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
function parseReadmeType(fragment: DocumentFragment): ReadmeInfo['type'] {
	const badgeImgUrl = fragment
		.querySelector('.projectBadges > img[alt="Project type"]')
		?.getAttribute('src');

	if (!isDefined(badgeImgUrl)) {
		warn('README project type badge not found');

		return null;
	}

	const typeMatches = /type-(\w+)-(\w+)/.exec(badgeImgUrl);

	if (!typeMatches || typeMatches.length < 3) {
		warn('README project type badge not found');

		return null;
	}

	return toTitleCase(typeMatches[1]);
}

// Parse a project's README to extract its name, description, and type
function transformReadme(
	slug: string,
	owner: string,
	readmeResponse: Queries.GithubDataDataUserRepositoriesNodes['readme'],
): ReadmeInfo {
	if (!isDefined(readmeResponse?.text)) {
		warn('README not found');

		return {
			name: null,
			descriptionHtml: null,
			logoUrl: null,
			type: null,
		};
	}

	const fragment = JSDOM.fragment(readmeResponse.text);

	return {
		name: parseReadmeName(fragment),
		descriptionHtml: parseReadmeDescriptionHtml(fragment),
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

// Transform the repo object into a format we can use
function transformGithubRepoNode(
	githubRepoNode: Queries.GithubDataDataUserRepositoriesNodes,
): TransformRepoNodeReturnValue {
	const slug = githubRepoNode.name;

	if (!isDefined(githubRepoNode.description)) {
		panicOnBuild('description is undefined');

		return {
			githubRepo: null,
			readmeText: null,
		};
	}

	const languages = transformLanguages(githubRepoNode?.languages);
	const topics = transformTopics(githubRepoNode?.repositoryTopics);
	const updatedAt = new Date(githubRepoNode.updatedAt);
	const readmeInfo = transformReadme(
		slug,
		githubRepoNode.owner.login,
		githubRepoNode.readme,
	);
	// Use the name from the README if it exists as it's more likely to be formatted correctly
	const name = readmeInfo.name || toTitleCase(githubRepoNode.name);
	const githubRepo = {
		description: githubRepoNode.description,
		descriptionHtml: readmeInfo.descriptionHtml,
		forkCount: githubRepoNode.forkCount,
		homepageUrl: githubRepoNode.homepageUrl,
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
		panicOnBuild('Skipping repo node creation due to missing data');

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

// Filter out repos that should be hidden
export function filterGithubRepoNodes(
	githubRepoNodes: Queries.GithubRepo[],
): Queries.GithubRepo[] {
	info('Hiding repos...');
	group();

	const filteredGithubRepoNodes = githubRepoNodes.filter((githubRepoNode) => {
		const rules = getGithubRepoRulesForSlug(githubRepoNode.slug);

		if (rules.hide) {
			info(githubRepoNode.slug);

			return false;
		}

		return true;
	});

	groupEnd();

	return filteredGithubRepoNodes;
}
