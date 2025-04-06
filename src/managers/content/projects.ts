/*
	A collection of functions to manage and transform projects shown on pages
	-------------------------------------------------------------------------
*/

import type { CreatePagesArgs } from 'gatsby';
import { PROJECT_METADATA_PATH } from '../../config/constants.ts';
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
	ProjectType,
	SchemaApplicationCategory,
	SchemaType,
} from '../../types/content/projects.ts';
import { SkillType } from '../../types/content/skills.ts';
import type { Maybe } from '../../types/utils.ts';
import {
	callIfDefined,
	findIndexOfSubstringInArray,
	ifDefined,
	toEnum,
} from '../../utils/other.ts';
import { assertIsDefined } from '../../utils/other.ts';
import { prettify } from '../../utils/other.ts';
import { assertIsDateString, toSentence } from '../../utils/strings.ts';
import { assertIsUrlString } from '../../utils/urls.ts';
import { getPageContentConfig, getProjectCategoryColor } from '../config.ts';
import { getSiteMetadata } from '../config.ts';
import { filterEntries } from './utils.ts';

// Constants

const SITE_METADATA = getSiteMetadata();

// Runtime vars

let cachedGithubRepoProjects: GithubRepoProject[] = [];
let cachedOtherProjects: OtherProject[] = [];
let cachedAuthorBio: Maybe<string>;

// Types

type GithubReposQueryData = {
	allGithubRepo: {
		nodes: Queries.GithubRepo[];
	};
};

// Functions

/**
 * Build a GitHub repo project from a {@link Queries.GithubRepo | GithubRepo} GraphQL node.
 *
 * @param githubRepoNode A {@link Queries.GithubRepo | GithubRepo} GraphQL node.
 * @returns A {@link GithubRepoProject} object.
 */
function buildGithubRepoProject(
	githubRepoNode: Queries.GithubRepo,
): GithubRepoProject {
	const {
		createdAt,
		description,
		background: nodeBackground,
		category,
		schema,
		updatedAt,
		url,
		...remainingProps
	} = githubRepoNode;

	const background = callIfDefined(toSentence, nodeBackground);
	const categoryName = callIfDefined(
		(value: string) => toEnum(ProjectCategory, value),
		category.name,
	);
	const type = callIfDefined(
		(value: string) => toEnum(SchemaType, value),
		schema?.type,
	);
	const applicationCategory = callIfDefined(
		(value: string) => toEnum(SchemaApplicationCategory, value),
		schema?.applicationCategory,
	);

	return {
		...remainingProps,
		...ifDefined({ background }),
		schema: {
			...ifDefined({ type }),
			...ifDefined({ applicationCategory }),
			...ifDefined({ operatingSystem: schema?.operatingSystem }),
		},
		category: {
			color: category.color,
			...ifDefined({ name: categoryName }),
		},
		createdAt: assertIsDateString(createdAt),
		updatedAt: assertIsDateString(updatedAt),
		description: toSentence(description),
		url: assertIsUrlString(url),
		type: ProjectType.GithubRepo,
	};
}

/**
 * Build an other project from an other project config object.
 *
 * @param projectConfig An {@link OtherProjectConfig} object.
 * @returns An {@link OtherProject} object.
 */
function buildOtherProject({
	category,
	...remainingProps
}: OtherProjectConfig): OtherProject {
	return {
		...remainingProps,
		type: ProjectType.Other,
		category: {
			color: getProjectCategoryColor(category),
			name: category,
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

	const githubRepoNodes: Maybe<Queries.GithubRepo[]> =
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
		PROJECTS_CONFIG[ProjectType.Other].map(buildOtherProject);

	return cachedOtherProjects;
}

/**
 * A filter function for hiding projects.
 *
 * @param project The project to filter.
 * @returns True if the project should be hidden, false otherwise.
 */
function doHideProject(project: Project) {
	return (
		project.category.name === ProjectCategory.Document ||
		(project.type === ProjectType.GithubRepo && project.isFork)
	);
}

/**
 * A filter function for pinning projects.
 *
 * @param pageLanguagesConfig The languages config for the page.
 * @param project The project to filter.
 * @returns True if the project should be pinned, false otherwise.
 */
function doPinProject(
	pageLanguagesConfig: PageContentConfig[ContentType.Skills][SkillType.Languages],
	project: Project,
) {
	const pinnedLanguages = pageLanguagesConfig?.[EntryVisibility.Pin];

	if (!pinnedLanguages) {
		return false;
	}

	// If any of the project's languages are pinned, also pin the project
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
 * Find the GitHub profile repo in a list of GithubRepoProjects and extract the author bio from it.
 *
 * @param graphql The Gatsby GraphQL function.
 * @returns A string containing the author bio.
 */
export async function getAuthorBio(graphql: CreatePagesArgs['graphql']) {
	if (cachedAuthorBio) {
		return cachedAuthorBio;
	}

	const githubRepoProjects = await fetchGithubRepoProjects(graphql);
	const profileRepo = githubRepoProjects.find(
		({ slug }) => slug === SITE_METADATA.author.username.github,
	);

	assertIsDefined(
		profileRepo,
		`Failed to find GitHub profile repo in list:\n${prettify(githubRepoProjects.map((repo) => repo.slug))}`,
	);

	const authorBio = profileRepo.background;

	assertIsDefined(
		authorBio,
		`Failed to extract author bio from GitHub profile repo. background not found, but it is required. Please add one to ${PROJECT_METADATA_PATH}: ${prettify(profileRepo)}`,
	);

	info(
		`Found author bio in GitHub profile repo: '${authorBio.slice(0, 64)}'...`,
	);

	cachedAuthorBio = authorBio;

	return authorBio;
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
	const pageLanguagesConfig = pageContentConfig?.skills[SkillType.Languages];
	const allProjects: Project[] = [
		...(await fetchGithubRepoProjects(graphql)),
		...fetchOtherProjects(),
	];
	const projectsSubset = filterEntries(
		pagePath,
		allProjects,
		pageProjectsConfig,
		(project) => project.slug,
		(project) => doPinProject(pageLanguagesConfig, project),
		undefined,
		doHideProject,
	);

	return projectsSubset;
}
