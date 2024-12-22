/*
	A collection of functions to manage and transform projects shown on pages
	-------------------------------------------------------------------------
*/

import type { CreatePagesArgs } from 'gatsby';
import { PROJECTS_CONFIG } from '../../config/content/projects.ts';
import { githubReposQuery } from '../../node/graphql.ts';
import { info, panic } from '../../node/logger.ts';
import {
	type ContentType,
	EntryVisibility,
	type PageContentConfig,
} from '../../types/content/content.ts';
import {
	type GithubRepoProject,
	type OtherProject,
	type OtherProjectConfig,
	type Project,
	ProjectCategory,
} from '../../types/content/projects.ts';
import { SkillType } from '../../types/content/skills.ts';
import { findIndexOfSubstringInArray } from '../../utils/other.ts';
import { assertIsDefined } from '../../utils/other.ts';
import { prettify } from '../../utils/other.ts';
import { getPageContentConfig, getProjectTypeColor } from '../config.ts';
import { getSiteMetadata } from '../config.ts';
import { filterEntries } from './utils.ts';

// Constants

const SITE_METADATA = getSiteMetadata();

// Runtime vars

let cachedGithubRepoProjects: GithubRepoProject[] = [];
let cachedOtherProjects: OtherProject[] = [];
let cachedAuthorBioHtml: string | undefined;

// Types

type GithubReposQueryData = {
	allGithubRepo: {
		nodes: Queries.GithubRepo[];
	};
};

// Functions

/**
 * Build a GitHub repo project from a GithubRepo GraphQL node.
 *
 * @param githubRepoNode A GithubRepo GraphQL node.
 * @returns A GithubRepoProject object.
 */
function buildGithubRepoProject(
	githubRepoNode: Queries.GithubRepo,
): GithubRepoProject {
	return {
		...githubRepoNode,
		category: ProjectCategory.GithubRepo,
	};
}

/**
 * Build an other project from an other project config object.
 *
 * @param projectConfig An OtherProjectConfig object.
 * @returns An OtherProject object.
 */
function buildOtherProject(projectConfig: OtherProjectConfig): OtherProject {
	return {
		...projectConfig,
		category: ProjectCategory.Other,
		createdAt: new Date(projectConfig.createdAt),
		updatedAt: new Date(projectConfig.updatedAt),
		type: {
			color: getProjectTypeColor(projectConfig.type),
			name: projectConfig.type,
		},
	};
}

/**
 * Fetch a list of GitHub repo projects from the Gatsby GraphQL API.
 *
 * @remarks
 *
 * Perform a query to fetch GithubRepo nodes, validate the response, and return a list of GithubRepoProject objects.
 *
 * @param graphql The Gatsby GraphQL function.
 * @returns A list of GithubRepoProject objects.
 */
async function fetchGithubRepoProjects(
	graphql: CreatePagesArgs['graphql'],
): Promise<GithubRepoProject[]> {
	if (cachedGithubRepoProjects.length > 0) {
		return cachedGithubRepoProjects;
	}

	const response = await graphql<GithubReposQueryData>(githubReposQuery);

	if (response.errors) {
		panic(
			`Failed to fetch GitHub repos. Response:\n${prettify(response.errors)}`,
		);
	}

	const githubRepoNodes: Queries.GithubRepo[] | undefined =
		response.data?.allGithubRepo.nodes;

	assertIsDefined(
		githubRepoNodes,
		`Failed to fetch GitHub repos. Response:\n${prettify(response)}`,
	);

	cachedGithubRepoProjects = githubRepoNodes.map(buildGithubRepoProject);

	return cachedGithubRepoProjects;
}

/**
 * Fetch a list of other projects from the projects config.
 *
 * @returns A list of OtherProject objects.
 */
function fetchOtherProjects(): OtherProject[] {
	if (cachedOtherProjects.length > 0) {
		return cachedOtherProjects;
	}

	cachedOtherProjects =
		PROJECTS_CONFIG[ProjectCategory.Other].map(buildOtherProject);

	return cachedOtherProjects;
}

/**
 * A filter function for hiding projects.
 *
 * @param project The project to filter.
 * @returns True if the project should be hidden, false otherwise.
 */
function doHideProject(project: Project) {
	return project.type.name === 'Markdown' || project?.isFork;
}

/**
 * A filter function for showing projects.
 *
 * @param pageSkillsConfig The skills config for the page.
 * @param project The project to filter.
 * @returns True if the project should be shown, false otherwise.
 */
function doShowProject(
	pageSkillsConfig: PageContentConfig[ContentType.Skills],
	project: Project,
) {
	const pageLanguagesConfig = pageSkillsConfig[SkillType.Languages];
	const pinnedLanguages = pageLanguagesConfig?.[EntryVisibility.Pin];

	if (!pinnedLanguages) {
		return false;
	}

	// If any of the project's languages are pinned, show the project
	for (const pinnedLanguage of pinnedLanguages) {
		const matchIndex = findIndexOfSubstringInArray(
			project.languages,
			pinnedLanguage,
		);

		if (matchIndex > 0) {
			return true;
		}
	}

	return false;
}

/**
 * Find the GitHub profile repo in a list of GithubRepoProjects and extract the author bio HTML from it.
 *
 * @param graphql The Gatsby GraphQL function.
 * @returns A string containing the author bio HTML.
 */
export async function getAuthorBioHtml(graphql: CreatePagesArgs['graphql']) {
	if (cachedAuthorBioHtml) {
		return cachedAuthorBioHtml;
	}

	const githubRepos = await fetchGithubRepoProjects(graphql);
	const profileReadmeRepo = githubRepos.find(
		({ slug }) => slug === SITE_METADATA.author.username.github,
	);

	assertIsDefined(
		profileReadmeRepo,
		`Failed to find GitHub profile repo in list:\n${prettify(githubRepos.map((repo) => repo.slug))}`,
	);

	const authorBioHtml = profileReadmeRepo?.descriptionHtml;

	assertIsDefined(
		authorBioHtml,
		`Failed to extract author bio HTML from GitHub profile repo:\n${prettify(profileReadmeRepo)}`,
	);

	info(`Extracted author bio HTML from GitHub profile repo:\n${authorBioHtml}`);

	cachedAuthorBioHtml = authorBioHtml;

	return authorBioHtml;
}

/**
 * Given a page path, returns the computed list of projects for that page.
 *
 * @param graphql The Gatsby GraphQL function.
 * @param pagePath The path of the page.
 * @returns An array of projects.
 */
export async function getProjectsForPage(
	graphql: CreatePagesArgs['graphql'],
	pagePath: string,
) {
	const pageContentConfig = getPageContentConfig(pagePath);
	const pageProjectsConfig = pageContentConfig?.projects;
	const pageSkillsConfig = pageContentConfig?.skills;
	const allProjects: Project[] = [
		...(await fetchGithubRepoProjects(graphql)),
		...fetchOtherProjects(),
	];
	const projectsSubset = filterEntries(
		pagePath,
		allProjects,
		pageProjectsConfig,
		(project) => project.slug,
		(project) => doShowProject(pageSkillsConfig, project),
		doHideProject,
	);

	return projectsSubset;
}
