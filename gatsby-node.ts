import { join, resolve } from 'node:path';
import type { CreatePagesArgs, GatsbyNode } from 'gatsby';
import { getPageMetadata, getSiteMetadata } from './src/common/config-manager';
import {
	ABOUT_PATH,
	CONTACT_PATH,
	EXPERIENCE_PATH,
	INDEX_PATH,
	PAGE_TEMPLATES_DIR,
	PROJECTS_PATH,
	PROJECTS_PATH_SHORT,
	RESUME_PATH,
	SOCIAL_IMAGES_PATH,
	SOCIAL_IMAGE_TEMPLATES_DIR,
} from './src/common/constants';
import {
	type AbsolutePathString,
	type EmptyObject,
	EntryPage,
	type IndexPageContext,
	type PageMetadata,
	type ProjectPageContext,
	type ResumePageContext,
} from './src/common/types';
import { assertIsDefined, prettify } from './src/common/utils';
import {
	getSubsetOfGithubRepos,
	transformGithubDataNode,
} from './src/node/github-response-transformer';
import { githubReposQuery, schema } from './src/node/graphql';
import { info, panic, setReporter, warn } from './src/node/logger';
import {
	createPage,
	createRedirect,
	deletePage,
	setGatsbyNodeHelpers,
} from './src/node/utils';

// Constants

const SITE_METADATA = getSiteMetadata();

const INDEX_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'index.tsx');
const PROJECT_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'index.tsx',
);
const RESUME_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'resume.tsx');
const PROJECT_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'project.tsx',
);
const OTHER_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'other.tsx',
);

// Types

type GithubReposQueryData = {
	allGithubRepo: {
		nodes: Queries.GithubRepo[];
	};
};

// Functions

// Fetch pinned repos from a GitHub profile
async function fetchGithubRepos(
	graphql: CreatePagesArgs['graphql'],
): Promise<Queries.GithubRepo[]> {
	const response = await graphql<GithubReposQueryData, unknown>(
		githubReposQuery,
	);

	if (response.errors) {
		panic(
			`Failed to fetch GitHub repos. Response:\n${prettify(response.errors)}`,
		);
	}

	const githubRepos: Queries.GithubRepo[] | undefined =
		response.data?.allGithubRepo.nodes;

	assertIsDefined(
		githubRepos,
		`Failed to fetch GitHub repos. Response:\n${prettify(response)}`,
	);

	return githubRepos;
}

// Find the GitHub profile repo and extract the author bio HTML from it
function getAuthorBioHtml(githubRepos: Queries.GithubRepo[]) {
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

// Create the landing page
function createIndexPage(
	githubRepos: Queries.GithubRepo[],
	authorBioHtml: string,
) {
	const context: IndexPageContext = {
		githubRepos: getSubsetOfGithubRepos(githubRepos, EntryPage.Index),
		authorBioHtml,
	};

	createPage({
		path: INDEX_PATH,
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Sort GitHub repos by creation date
function sortByCreatedAt(a: Queries.GithubRepo, b: Queries.GithubRepo) {
	return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

// Create the resume page
function createResumePage(githubRepos: Queries.GithubRepo[]) {
	const pageMetadata: PageMetadata | EmptyObject =
		getPageMetadata(RESUME_PATH) || {};
	const context: ResumePageContext = {
		pageMetadata,
		githubRepos: getSubsetOfGithubRepos(
			githubRepos,
			EntryPage.Resume,
			sortByCreatedAt,
		),
	};

	createPage({
		path: RESUME_PATH,
		component: RESUME_PAGE_TEMPLATE,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Create project pages
function createProjectPages(githubRepos: Queries.GithubRepo[]) {
	for (const githubRepo of githubRepos) {
		const path: AbsolutePathString = join(
			PROJECTS_PATH,
			githubRepo.slug,
		) as AbsolutePathString;
		const shortPath: AbsolutePathString = join(
			PROJECTS_PATH_SHORT,
			githubRepo.slug,
		) as AbsolutePathString;
		const context: ProjectPageContext = {
			githubRepo,
		};

		// Create project pages
		createPage({
			path,
			component: PROJECT_PAGE_TEMPLATE,
			socialImageComponent: PROJECT_OG_IMAGE_TEMPLATE,
			context,
		});

		createRedirect(shortPath, path);
	}
}

// Create client-side redirects
function createRedirects() {
	const redirects = [
		[ABOUT_PATH, '/#about'],
		[PROJECTS_PATH, '/#projects'],
		[EXPERIENCE_PATH, '/#experience'],
		[CONTACT_PATH, '/#contact'],
	];

	for (const [fromPath, toPath] of redirects) {
		createRedirect(fromPath, toPath);
	}
}

// Save Gatsby Node API Helpers for later use
export const onPluginInit: GatsbyNode['onPluginInit'] = ({
	reporter,
	actions: { createPage, deletePage, createRedirect },
}) => {
	setReporter(reporter);
	setGatsbyNodeHelpers(createPage, deletePage, createRedirect);
};

// Add custom types to the GraphQL schema
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
	({ actions: { createTypes } }) => {
		// Overwrite fields that we know are non-null (as per the GitHub GraphQL schema)
		createTypes(schema);
	};

// Transform source nodes into a more usable format
export const onCreateNode: GatsbyNode<Queries.GithubData>['onCreateNode'] = ({
	node,
	actions: { createNode },
	createContentDigest,
}) => {
	if (node.internal.type === 'GithubData') {
		transformGithubDataNode(node, createNode, createContentDigest);
	}
};

// Add metadata to automatically generated pages and generate the associated Open Graph images
export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page }) => {
	if (!page.path) {
		return;
	}

	// Skip social images
	if (page.path.startsWith(SOCIAL_IMAGES_PATH)) {
		return;
	}

	const pageMetadata = getPageMetadata(page.path);

	if (!pageMetadata) {
		warn(`Skipped adding metadata to ${page.path}`);

		return;
	}

	deletePage(page);
	createPage({
		...page,
		path: page.path as AbsolutePathString,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: {
			...page.context,
			pageMetadata: pageMetadata,
		},
	});
};

// Manually create pages and generate the associated Open Graph images
export const createPages: GatsbyNode['createPages'] = async ({ graphql }) => {
	const githubRepos = await fetchGithubRepos(graphql);
	const authorBioHtml = getAuthorBioHtml(githubRepos);

	// TODO: Re-enable this when project pages are implemented
	// createProjectPages(githubRepos);
	createIndexPage(githubRepos, authorBioHtml);
	createResumePage(githubRepos);
	createRedirects();
};
