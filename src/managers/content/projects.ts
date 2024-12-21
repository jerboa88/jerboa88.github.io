/*
	Functions to fetch and manage projects
	--------------------------------------
*/

import type { CreatePagesArgs } from 'gatsby';
import {
	getMaxProjectsForPage,
	getOtherProjects,
	getProjectVisibilityForPage,
	getSiteMetadata,
} from '../common/config-manager.ts';
import {
	assertIsDefined,
	assertUnreachable,
	isDefined,
	limit,
} from '../common/utils/other.ts';
import { prettify } from '../common/utils/other.ts';
import { type EntryPage, EntryVisibility } from '../types/content/content.ts';
import {
	type GithubRepoProject,
	type OtherProject,
	type Project,
	ProjectCategory,
} from '../types/content/projects.ts';
import { githubReposQuery } from './graphql.ts';
import { info, panic, warn } from './logger.ts';

// Constants

const SITE_METADATA = getSiteMetadata();

// Types

type GithubReposQueryData = {
	allGithubRepo: {
		nodes: Queries.GithubRepo[];
	};
};

// Functions

/**
 * Get the visibility of a GitHub repo project on a specific page
 *
 * @remarks
 *
 * This function contains additional logic to hide forked and Markdown repos. If the visibility is not defined, it will default to showing the repo.
 *
 * @param page The page to get the visibility for
 * @param project The project to get the visibility for
 * @returns The visibility of the project on the specified page
 */
function getVisibilityForGithubRepoProject(
	page: EntryPage,
	project: GithubRepoProject,
) {
	const visibility = getProjectVisibilityForPage(page, project.slug);

	if (isDefined(visibility)) {
		return visibility;
	}

	if (project.isFork) {
		warn(
			`Hiding project '${project.slug}' on ${page} page as it is a forked repo`,
		);

		return EntryVisibility.Hide;
	}

	if (project.type.name === 'Markdown') {
		warn(
			`Hiding project '${project.slug}' on ${page} page as it is a Markdown repo`,
		);

		return EntryVisibility.Hide;
	}

	return EntryVisibility.Show;
}

/**
 * Get the visibility of a manually added project on a specific page
 *
 * @remarks
 *
 * If the visibility is not defined, it will default to showing the project.
 *
 * @param page The page to get the visibility for
 * @param project The project to get the visibility for
 * @returns The visibility of the project on the specified page
 */
function getVisibilityForOtherProject(page: EntryPage, project: OtherProject) {
	const visibility = getProjectVisibilityForPage(page, project.slug);

	if (isDefined(visibility)) {
		return visibility;
	}

	return EntryVisibility.Show;
}

/**
 * Get a subset of GitHub repos based on visibility and a maximum number of repos
 *
 * @param projects A list of projects
 * @param page The page to get the subset for
 * @param sortFunction A optional function to sort the repos
 * @returns A filtered subset of GitHub repos
 */
export function getSubsetOfProjects(
	projects: Project[],
	page: EntryPage,
	sortFunction?: (a: Project, b: Project) => number,
) {
	const maxProjects = getMaxProjectsForPage(page);
	const pinnedProjects: Project[] = [];
	const includedProjects: Project[] = [];

	for (const project of projects) {
		let visibility: EntryVisibility;

		switch (project.category) {
			case ProjectCategory.GithubRepo:
				visibility = getVisibilityForGithubRepoProject(page, project);

				break;
			case ProjectCategory.Other:
				visibility = getVisibilityForOtherProject(page, project);

				break;
			default:
				assertUnreachable(project);
		}

		if (visibility === EntryVisibility.Pin) {
			pinnedProjects.push(project);
		} else if (visibility === EntryVisibility.Show) {
			includedProjects.push(project);
		}
	}

	const filteredGithubRepos = limit(
		[...pinnedProjects, ...includedProjects],
		maxProjects,
	);

	if (isDefined(sortFunction)) {
		filteredGithubRepos.sort(sortFunction);
	}

	info(
		`Showing top ${maxProjects} repos on ${page} page out of ${pinnedProjects.length} pinned repos and ${includedProjects.length} included repos`,
	);

	return filteredGithubRepos;
}

/**
 * Fetch a list of GitHub repo projects
 *
 * @remarks
 *
 * Perform a query to fetch GithubRepo nodes, validate the response, and return a list of GithubRepoProject objects
 *
 * @param graphql The Gatsby GraphQL function
 * @returns A list of GithubRepoProject objects
 */
async function getGithubRepoProjects(
	graphql: CreatePagesArgs['graphql'],
): Promise<GithubRepoProject[]> {
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

	return githubRepoNodes.map((repoNode) => ({
		...repoNode,
		category: ProjectCategory.GithubRepo,
	}));
}

/**
 * Find the GitHub profile repo in a list of GithubRepoProjects and extract the author bio HTML from it
 *
 * @param githubRepos A list of GithubRepoProjects
 * @returns The author bio HTML
 */
function getAuthorBioHtml(githubRepos: GithubRepoProject[]) {
	const profileReadmeRepo = githubRepos.find(
		(githubRepo) => githubRepo.slug === SITE_METADATA.author.username.github,
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

	return authorBioHtml;
}

/**
 * Get a list of projects
 *
 * @param graphql The Gatsby GraphQL function
 * @returns A list of projects and the author bio HTML
 */
export async function getProjects(graphql: CreatePagesArgs['graphql']) {
	const repoProjects = await getGithubRepoProjects(graphql);
	const otherProjects = getOtherProjects();
	const authorBioHtml = getAuthorBioHtml(repoProjects);

	return {
		projects: [...repoProjects, ...otherProjects],
		authorBioHtml,
	};
}
