import { resolve, join } from 'path';
import type { Actions, CreatePagesArgs, GatsbyNode } from 'gatsby';
import { createImage } from 'gatsby-plugin-component-to-image';
import { Path, PinnedRepoResponseInterface, SocialImageTypes } from './src/common/types';
import { PROJECTS_DIR, SOCIAL_IMAGES_DIR as SOCIAL_IMAGE_PAGES_DIR } from './src/common/constants';
import ConfigManager from './src/common/config-manager';
import ResponseParser from './src/node/response-parser';
import ResponseMapper from './src/node/response-mapper';
import { removeTrailingSlash } from './src/common/utilities';


// Constants

const INDEX_PAGE_TEMPLATE = resolve('./src/templates/page/index.tsx');
const PROJECT_PAGE_TEMPLATE = resolve('./src/templates/page/project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = resolve('./src/templates/og-image/index.tsx');
const PROJECT_OG_IMAGE_TEMPLATE = resolve('./src/templates/og-image/project.tsx');
const OTHER_OG_IMAGE_TEMPLATE = resolve('./src/templates/og-image/other.tsx');

const configManager = new ConfigManager();


// Types

interface CreatePageOptions {
	path: Path;
	component: string;
	socialImageComponent: string;
	context: object;
}

interface CreateSocialImagesOptions {
	path: string;
	component: string;
	context?: object;
}


// Functions

// Fetch pinned repos from a GitHub profile
async function fetchPinnedRepos(graphql: CreatePagesArgs['graphql']) {
	const response = await graphql(`
		query PinnedRepoQuery {
			github {
				user(login: "jerboa88") {
					pinnedItems(first: 10) {
						nodes {
							... on GITHUB_Repository {
								name
								description
								homepageUrl
								usesCustomOpenGraphImage
								openGraphImageUrl
								stargazerCount
								githubUrl: url
								updatedAt
								languages(first: 4) {
									nodes {
										name
										color
									}
								}
								licenseInfo {
									spdxId
									name
									url
								}
								readmeFromMaster: object(expression: "master:README.md") {
									... on GITHUB_Blob {
										text
									}
								}
								readmeFromMain: object(expression: "main:README.md") {
									... on GITHUB_Blob {
										text
									}
								}
								readmeFromGhPages: object(expression: "gh-pages:README.md") {
									... on GITHUB_Blob {
										text
									}
								}
							}
						}
					}
				}
			}
		}
	`);

	if (!response || 'errors' in response) {
		throw new Error('The response from GitHub contains errors', response?.errors);
	}

	const data = response.data as Queries.PinnedRepoQueryQuery;
	const pinnedRepos = data.github.user?.pinnedItems.nodes;

	if (!pinnedRepos) {
		throw new Error('No pinned repos found');
	}

	return pinnedRepos;
}


// Assert that the response data is non-empty before we start processing it
function assertResponseDataIsNonEmpty(responseData) {
	if (!responseData || Object.keys(responseData).length === 0) {
		throw new Error('Pinned repo does not contain any data');
	}
}


// Generate a single social image for a page
function createSocialImage(type: SocialImageTypes, { path, component, context }: CreateSocialImagesOptions) {
	const pagePath = join(SOCIAL_IMAGE_PAGES_DIR, type, path);
	const imageFileName = path === '/' ? 'index' : removeTrailingSlash(path);
	const imagePath = join('/', 'images', type, `${imageFileName}.webp`);
	const { size } = configManager.getSocialImageGenerationConfigForType(type);
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
function createPage(gatsbyCreatePage: Actions['createPage'], { path, component, socialImageComponent, context }: CreatePageOptions) {
	console.debug(`Creating page at ${path}`);

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
		}
	});
}


// Add metadata to automatically generated pages and generate the associated Open Graph images
export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
	const {
		createPage: gatsbyCreatePage,
		deletePage: gatsbyDeletePage
	} = actions;
	if (!page.path) {
		return;
	}

	// Skip social images
	if (page.path.startsWith(SOCIAL_IMAGE_PAGES_DIR)) {
		return;
	}

	const pageMetadata = configManager.getPageMetadata(page.path);

	if (!pageMetadata) {
		console.warn(`Skipped adding metadata to ${page.path}`);

		return;
	}

	gatsbyDeletePage(page);

	createPage(gatsbyCreatePage, {
		...page,
		path: page.path as Path,
		socialImageComponent: OTHER_OG_IMAGE_TEMPLATE,
		context: {
			...page.context,
			pageMetadata: pageMetadata,
		}
	});
}


// Manually create pages and generate the associated Open Graph images
export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage: gatsbyCreatePage }, graphql }) => {
	const pinnedReposResponseData = await fetchPinnedRepos(graphql);
	const pinnedRepos = pinnedReposResponseData.map(responseData => {
		assertResponseDataIsNonEmpty(responseData);

		const projectInfo = ResponseMapper.map(
			ResponseParser.parse(responseData as PinnedRepoResponseInterface)
		);

		// Create project pages
		createPage(gatsbyCreatePage, {
			path: join(PROJECTS_DIR, projectInfo.slug) as Path,
			component: PROJECT_PAGE_TEMPLATE,
			socialImageComponent: PROJECT_OG_IMAGE_TEMPLATE,
			context: {
				repo: projectInfo,
			},
		});

		return projectInfo;
	});

	// Create landing page
	createPage(gatsbyCreatePage, {
		path: '/',
		component: INDEX_PAGE_TEMPLATE,
		socialImageComponent: INDEX_OG_IMAGE_TEMPLATE,
		context: {
			pinnedRepos: pinnedRepos,
		},
	});
}
