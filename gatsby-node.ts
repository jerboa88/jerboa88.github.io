import assert from 'node:assert/strict';
import { join, resolve } from 'node:path';
import type { Actions, CreatePagesArgs, GatsbyNode } from 'gatsby';
import { createImage } from 'gatsby-plugin-component-to-image';
import {
	getGithubRepoRulesDefaults,
	getPageMetadata,
	getSiteMetadata,
	getSocialImageGenerationConfigForType,
} from './src/common/config-manager';
import {
	PAGE_TEMPLATES_DIR,
	PROJECTS_DIR,
	PROJECTS_DIR_SHORT,
	SOCIAL_IMAGES_DIR as SOCIAL_IMAGE_PAGES_DIR,
	SOCIAL_IMAGE_TEMPLATES_DIR,
} from './src/common/constants';
import type {
	AbsolutePathString,
	IndexPageContext,
	ProjectPageContext,
	ResumePageContext,
	SocialImageTypes,
} from './src/common/types';
import {
	isDefined,
	limit,
	prettify,
	removeTrailingSlash,
} from './src/common/utils';
import {
	filterGithubRepoNodes,
	transformGithubDataNode,
} from './src/node/github-response-transformer';
import { githubReposQuery, schema } from './src/node/graphql';
import { info, panic, setReporter, warn } from './src/node/logger';

// Constants

const INDEX_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'index.tsx');
const PROJECT_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'index.tsx',
);
// const RESUME_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'resume.tsx');
const PROJECT_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'project.tsx',
);
const OTHER_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'other.tsx',
);

const SITE_METADATA = getSiteMetadata();
const INDEX_PAGE_REPOS_MAX = getGithubRepoRulesDefaults().limit;

// Runtime variables

let gatsbyCreatePage: Actions['createPage'] | undefined = undefined;
let gatsbyDeletePage: Actions['deletePage'] | undefined = undefined;
let gatsbyCreateRedirect: Actions['createRedirect'] | undefined = undefined;

// Types

type GithubReposQueryData = {
	allGithubRepo: {
		nodes: Queries.GithubRepo[];
	};
};

interface CreatePageOptions {
	path: AbsolutePathString;
	component: string;
	socialImageComponent: string;
	context: object;
}

interface CreateSocialImagesOptions {
	path: string;
	component: string;
	context: object;
}

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

	if (!isDefined(githubRepos)) {
		panic(`Failed to fetch GitHub repos. Response:\n${prettify(response)}`);
	}

	return githubRepos;
}

// Find the GitHub profile repo and extract the author bio HTML from it
function getAuthorBioHtml(githubRepos: Queries.GithubRepo[]) {
	const profileReadmeRepo = githubRepos.find(
		(githubRepo) => githubRepo.slug === SITE_METADATA.author.username.github,
	);

	if (!isDefined(profileReadmeRepo)) {
		panic(
			`Failed to find GitHub profile repo in list:\n${prettify(githubRepos.map((repo) => repo.slug))}`,
		);
	}

	const authorBioHtml = profileReadmeRepo?.descriptionHtml;

	if (!isDefined(authorBioHtml)) {
		panic(
			`Failed to extract author bio HTML from GitHub profile repo:\n${prettify(profileReadmeRepo)}`,
		);
	}

	info(`Extracted author bio HTML from GitHub profile repo:\n${authorBioHtml}`);

	return authorBioHtml;
}

// Generate a single social image for a page
function createSocialImage(
	type: SocialImageTypes,
	{ path, component, context }: CreateSocialImagesOptions,
) {
	const pagePath = join(SOCIAL_IMAGE_PAGES_DIR, type, path);
	const imageFileName = path === '/' ? 'index' : removeTrailingSlash(path);
	const imagePath = join('/', 'images', type, `${imageFileName}.webp`);
	const { size } = getSocialImageGenerationConfigForType(type);
	const socialImageMetadata = createImage({
		pagePath,
		imagePath,
		component,
		size,
		context,
	});

	return socialImageMetadata;
}

// Generate a set of social images for a page
function createSocialImages(options: CreateSocialImagesOptions) {
	return {
		og: createSocialImage('og', options),
		twitter: createSocialImage('twitter', options),
	};
}

// Create a page and generate the associated social images for it
function createPage({
	path,
	component,
	socialImageComponent,
	context,
}: CreatePageOptions) {
	info(`Creating page at ${path}`);

	assert(gatsbyCreatePage !== undefined);

	const socialImagesMetadata = createSocialImages({
		path: path,
		component: socialImageComponent,
		context: context,
	});

	gatsbyCreatePage({
		path: path,
		component: component,
		context: {
			...context,
			socialImagesMetadata: socialImagesMetadata,
		},
	});
}

// Create a client-side redirect
function createRedirect(fromPath: string, toPath: string) {
	assert(gatsbyCreateRedirect !== undefined);

	gatsbyCreateRedirect({
		fromPath: fromPath,
		toPath: toPath,
		isPermanent: true,
	});
}

// Create the landing page
function createIndexPage(
	githubRepos: Queries.GithubRepo[],
	authorBioHtml: string,
) {
	const context: IndexPageContext = {
		githubRepos: limit(
			filterGithubRepoNodes(githubRepos),
			INDEX_PAGE_REPOS_MAX,
		),
		authorBioHtml,
	};

	createPage({
		path: '/',
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: context,
	});
}

// Create the resume page
// function createResumePage(githubRepos: Queries.GithubRepo[]) {
// 	const context: ResumePageContext = {
// 		githubRepos: limit(
// 			filterGithubRepoNodes(githubRepos),
// 			INDEX_PAGE_REPOS_MAX,
// 		),
// 	};

// 	createPage({
// 		path: '/resume',
// 		component: RESUME_PAGE_TEMPLATE,
// 		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
// 		context: context,
// 	});
// }

// Create project pages
function createProjectPages(githubRepos: Queries.GithubRepo[]) {
	for (const githubRepo of githubRepos) {
		const path: AbsolutePathString = join(
			PROJECTS_DIR,
			githubRepo.slug,
		) as AbsolutePathString;
		const shortPath: AbsolutePathString = join(
			PROJECTS_DIR_SHORT,
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
		['/about', '/#about'],
		['/projects', '/#projects'],
		['/experience', '/#experience'],
		['/contact', '/#contact'],
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
	gatsbyCreatePage = createPage;
	gatsbyDeletePage = deletePage;
	gatsbyCreateRedirect = createRedirect;

	setReporter(reporter);
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
	if (page.path.startsWith(SOCIAL_IMAGE_PAGES_DIR)) {
		return;
	}

	const pageMetadata = getPageMetadata(page.path);

	if (!pageMetadata) {
		warn(`Skipped adding metadata to ${page.path}`);

		return;
	}

	assert(gatsbyDeletePage !== undefined);

	gatsbyDeletePage(page);

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
	// Re-enable this when the resume page is implemented
	// createResumePage(githubRepos);
	createRedirects();
};
