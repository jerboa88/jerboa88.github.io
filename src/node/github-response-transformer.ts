/*
	Functions to transform data from the GitHub API into a more usable format
	-------------------------------------------------------------------------
*/

import { JSDOM } from 'jsdom';
import {
	getGithubRepoRulesDefaults,
	getGithubRepoRulesForSlug,
	getProjectTypeColor,
} from '../common/config-manager';
import type {
	GithubRepo,
	GithubRepoQuery,
	GithubReposQueryResponse,
	UrlString,
} from '../common/types';
import {
	isDefined,
	limit,
	prettify,
	toKebabCase,
	toTitleCase,
} from '../common/utilities';

// Types

type ReadmeInfo = {
	text: string | null;
	name: string | null;
	description: string | null;
	logoUrl: string | null;
	type: string | null;
};

type BuildLogMsgOptionalArgs = {
	repoSlug?: string;
	response?: object | undefined | null;
};

// Constants

const LOG_PREFIX = 'GitHub Response Transformer - ';
const GITHUB_CONTENT_BASE_URL: UrlString = 'https://raw.githubusercontent.com';
const REPOS_LIMIT = getGithubRepoRulesDefaults().limit;

// Construct a log message for describing a missing property
function buildLogMsg(property: string, optionalArgs?: BuildLogMsgOptionalArgs) {
	const repoSlugString = isDefined(optionalArgs?.repoSlug)
		? `for '${optionalArgs.repoSlug}' repo `
		: '';
	const responseString = isDefined(optionalArgs?.response)
		? `: ${prettify(optionalArgs.response)}`
		: '';

	return `${LOG_PREFIX}${property} missing ${repoSlugString}${responseString}`;
}

// Extract a project's name from its README
function parseReadmeName(
	slug: string,
	fragment: DocumentFragment,
): ReadmeInfo['name'] {
	const linkElement = fragment.querySelector('.projectName > a');
	const name =
		linkElement?.getAttribute('title') ??
		linkElement?.textContent ??
		fragment.querySelector('.projectName')?.textContent;

	if (isDefined(name)) {
		return name.trim();
	}

	console.warn(buildLogMsg('README name', { repoSlug: slug }));

	return null;
}

// Extract a project's description from its README
function parseReadmeDescription(
	slug: string,
	fragment: DocumentFragment,
): ReadmeInfo['description'] {
	const description = fragment.querySelector('.projectDesc')?.textContent;

	if (isDefined(description)) {
		return description.trim();
	}

	console.warn(buildLogMsg('README description', { repoSlug: slug }));

	return null;
}

// Extract a project's logo URL from its README
function parseReadmeLogoUrl(
	slug: string,
	fragment: DocumentFragment,
): ReadmeInfo['name'] {
	const logoUrl = fragment.querySelector('.projectLogo')?.getAttribute('src');

	if (isDefined(logoUrl)) {
		return logoUrl;
	}

	console.warn(buildLogMsg('README logo URL', { repoSlug: slug }));

	return null;
}

// Extract a project's type from its README
function parseReadmeType(
	slug: string,
	fragment: DocumentFragment,
): ReadmeInfo['type'] {
	const badgeImgUrl = fragment
		.querySelector('.projectBadges > img[alt="Project type"]')
		?.getAttribute('src');

	if (!isDefined(badgeImgUrl)) {
		console.warn(buildLogMsg('README type', { repoSlug: slug }));

		return null;
	}

	const typeMatches = /type-(\w+)-(\w+)/.exec(badgeImgUrl);

	if (!typeMatches || typeMatches.length < 3) {
		console.warn(buildLogMsg('README type', { repoSlug: slug }));

		return null;
	}

	return toTitleCase(typeMatches[1]);
}

// Parse a project's README to extract its name, description, and type
function transformReadme(
	slug: string,
	readmeResponse: GithubRepoQuery['readme'],
): ReadmeInfo {
	if (!isDefined(readmeResponse?.text)) {
		console.warn(
			buildLogMsg('readme.text', {
				repoSlug: slug,
				response: readmeResponse,
			}),
		);

		return {
			text: null,
			name: null,
			description: null,
			logoUrl: null,
			type: null,
		};
	}

	const fragment = JSDOM.fragment(readmeResponse.text);

	return {
		text: readmeResponse.text,
		name: parseReadmeName(slug, fragment),
		description: parseReadmeDescription(slug, fragment),
		logoUrl: parseReadmeLogoUrl(slug, fragment),
		type: parseReadmeType(slug, fragment),
	};
}

// Transform the languages object into a simple array of strings
function transformLanguages(
	slug: string,
	languagesResponse: GithubRepoQuery['languages'],
): string[] {
	const nodes = languagesResponse?.nodes;
	const languages: string[] = [];

	if (!isDefined(nodes)) {
		console.warn(
			buildLogMsg('languages.nodes', {
				repoSlug: slug,
				response: languagesResponse,
			}),
		);

		return languages;
	}

	for (const node of nodes) {
		if (isDefined(node?.name)) {
			languages.push(node.name);
		} else {
			console.warn(
				buildLogMsg('languages.nodes[].name', {
					repoSlug: slug,
					response: languagesResponse,
				}),
			);
		}
	}

	return languages.sort();
}

// Transform the topics object into a simple array of strings
function transformTopics(
	slug: string,
	topicsResponse: GithubRepoQuery['repositoryTopics'],
): string[] {
	const nodes = topicsResponse?.nodes;
	const topics: string[] = [];

	if (!isDefined(nodes)) {
		console.warn(
			buildLogMsg('repositoryTopics.nodes', {
				repoSlug: slug,
				response: topicsResponse,
			}),
		);

		return topics;
	}

	for (const node of nodes) {
		if (isDefined(node?.topic?.name)) {
			topics.push(node.topic?.name);
		} else {
			console.warn(
				buildLogMsg('repositoryTopics.nodes[].topic.name', {
					repoSlug: slug,
					response: topicsResponse,
				}),
			);
		}
	}

	return topics.sort();
}

// Transform the repo object into a format we can use
function transformRepo(repo: GithubRepoQuery): GithubRepo {
	if (!isDefined(repo.name)) {
		throw new Error(buildLogMsg('name', { response: repo }));
	}

	if (!isDefined(repo.owner?.login)) {
		throw new Error(buildLogMsg('owner.login', { response: repo }));
	}

	const slug = toKebabCase(repo.name);
	const languages = transformLanguages(slug, repo?.languages);
	const topics = transformTopics(slug, repo?.repositoryTopics);

	let updatedAt: Date | null = null;

	if (isDefined(repo.updatedAt)) {
		updatedAt = new Date(repo.updatedAt);
	} else {
		console.warn(buildLogMsg('updatedAt', { repoSlug: slug, response: repo }));
	}

	const licenseInfo = repo.licenseInfo;
	const readmeInfo = transformReadme(slug, repo.readme);
	const readmeText = readmeInfo.text;

	// Use the name from the README if it exists as it's more likely to be formatted correctly
	const name = readmeInfo.name || toTitleCase(repo.name);

	let logoUrl = readmeInfo.logoUrl;

	if (isDefined(logoUrl)) {
		if (!logoUrl.startsWith('http')) {
			const relativeLogoPath = `${repo.owner.login}/${slug}/HEAD/${logoUrl}`;

			logoUrl = new URL(relativeLogoPath, GITHUB_CONTENT_BASE_URL).toString();
		}
	}

	return {
		description: readmeInfo.description,
		forkCount: repo.forkCount,
		homepageUrl: repo.homepageUrl,
		languages: languages,
		logoUrl,
		licenseInfo: licenseInfo,
		name,
		openGraphImageUrl: repo.openGraphImageUrl,
		owner: repo.owner.login,
		readmeText,
		shortDescription: repo.description,
		slug,
		stargazerCount: repo.stargazerCount,
		topics,
		type: {
			color: getProjectTypeColor(readmeInfo.type),
			name: readmeInfo.type,
		},
		updatedAt,
		url: repo.url,
		usesCustomOpenGraphImage: repo.usesCustomOpenGraphImage,
	};
}

// Check rules and return true if the repo should be included in the list
function includeRepo(repo: GithubRepo): boolean {
	const rules = getGithubRepoRulesForSlug(repo.slug);

	if (rules.hide) {
		console.info(`${LOG_PREFIX}Hiding repo '${repo.slug}'`);

		return false;
	}

	return true;
}

// Transform the GitHub API response into a simple array of repos
export function transformGithubResponse(response: GithubReposQueryResponse) {
	if (response.errors) {
		throw new Error(
			`${LOG_PREFIX}GitHub response contains errors: ${prettify(response.errors)}`,
		);
	}

	const nodes = response.data?.githubData?.data?.user?.repositories?.nodes;
	const repos: GithubRepo[] = [];

	if (!isDefined(nodes)) {
		throw new TypeError(buildLogMsg('nodes', { response }));
	}

	for (const node of nodes) {
		if (!isDefined(node)) {
			throw new TypeError(buildLogMsg('node', { response: nodes }));
		}

		const repo = transformRepo(node);

		if (includeRepo(repo)) {
			repos.push(transformRepo(node));
		}
	}

	return limit(repos, REPOS_LIMIT);
}
