import assert from 'node:assert/strict';
import { join, resolve } from 'node:path';
import type { Actions, CreatePagesArgs, GatsbyNode, Reporter } from 'gatsby';
import { createImage } from 'gatsby-plugin-component-to-image';
import {
	getPageMetadata,
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
	GithubReposQueryResponse,
	SocialImageTypes,
} from './src/common/types';
import { removeTrailingSlash } from './src/common/utilities';
import { transformGithubResponse } from './src/node/github-response-transformer';

// Constants

const INDEX_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'index.tsx');
// const PROJECT_PAGE_TEMPLATE = resolve(PAGE_TEMPLATES_DIR, 'project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'index.tsx',
);
// const PROJECT_OG_IMAGE_TEMPLATE = resolve(
// 	SOCIAL_IMAGE_TEMPLATES_DIR,
// 	'project.tsx',
// );
const OTHER_OG_IMAGE_TEMPLATE = resolve(
	SOCIAL_IMAGE_TEMPLATES_DIR,
	'other.tsx',
);

// Runtime variables

let gatsbyCreatePage: Actions['createPage'] | undefined = undefined;
let gatsbyDeletePage: Actions['deletePage'] | undefined = undefined;
let gatsbyCreateRedirect: Actions['createRedirect'] | undefined = undefined;
let gatsbyReporter: Reporter | undefined = undefined;

// Types

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
async function fetchGithubRepos(graphql: CreatePagesArgs['graphql']) {
	const response: GithubReposQueryResponse = await graphql(`
		query GithubRepos {
			githubData {
				data {
					user {
						repositories {
							nodes {
								description
								forkCount
								homepageUrl
								languages {
									nodes {
										name
									}
								}
								licenseInfo {
									name
									spdxId
									url
								}
								name
								openGraphImageUrl
								owner {
									login
								}
								readme {
									text
								}
								repositoryTopics {
									nodes {
										topic {
											name
										}
									}
								}
								stargazerCount
								updatedAt
								url
								usesCustomOpenGraphImage
							}
						}
					}
				}
			}
		}
	`);

	return transformGithubResponse(response);
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
	gatsbyReporter?.info(`Creating page at ${path}`);

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

// Save Gatsby Node API Helpers for later use
export const onPluginInit: GatsbyNode['onPluginInit'] = ({
	reporter,
	actions: { createPage, deletePage, createRedirect },
}) => {
	gatsbyCreatePage = createPage;
	gatsbyDeletePage = deletePage;
	gatsbyCreateRedirect = createRedirect;
	gatsbyReporter = reporter;
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
		gatsbyReporter?.warn(`Skipped adding metadata to ${page.path}`);

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

	for (const githubRepo of githubRepos) {
		const path: AbsolutePathString = join(
			PROJECTS_DIR,
			githubRepo.slug,
		) as AbsolutePathString;
		const shortPath: AbsolutePathString = join(
			PROJECTS_DIR_SHORT,
			githubRepo.slug,
		) as AbsolutePathString;

		// TODO: Re-enable this when project pages are implemented
		// Create project pages
		// createPage({
		// 	path: path,
		// 	component: PROJECT_PAGE_TEMPLATE,
		// 	socialImageComponent: PROJECT_OG_IMAGE_TEMPLATE,
		// 	context: {
		// 		githubRepo: githubRepo,
		// 	},
		// });

		createRedirect(shortPath, path);
	}

	// Create landing page
	createPage({
		path: '/',
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: {
			githubRepos: githubRepos,
		},
	});

	createRedirect('/about', '/#about');
	createRedirect('/projects', '/#projects');
	createRedirect('/experience', '/#experience');
	createRedirect('/contact', '/#contact');
};
