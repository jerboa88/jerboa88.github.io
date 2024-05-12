import path from 'path';
import type { CreatePagesArgs, GatsbyNode } from 'gatsby';
import { createOpenGraphImage } from 'gatsby-plugin-dynamic-open-graph-images';
import { PinnedRepoResponseInterface } from './src/common/types';
import { PROJECTS_DIR, OG_IMAGE_DIR } from './src/common/constants';
import ResponseParser from './src/node/response-parser';
import ResponseMapper from './src/node/response-mapper';


// Constants

const INDEX_PAGE_TEMPLATE = path.resolve('./src/templates/page/index.tsx');
const PROJECT_PAGE_TEMPLATE = path.resolve('./src/templates/page/project.tsx');

const INDEX_OG_IMAGE_TEMPLATE = path.resolve('./src/templates/og-image/index.tsx');
const PROJECT_OG_IMAGE_TEMPLATE = path.resolve('./src/templates/og-image/project.tsx');
const OTHER_OG_IMAGE_TEMPLATE = path.resolve('./src/templates/og-image/other.tsx');


// Types

interface GenerateOpenGraphImageOptions {
	id: string;
	component: string;
	context?: Object;
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
		console.warn('response', response);

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


// Generate an Open Graph image for a page
function generateOpenGraphImage(createPage: CreatePagesArgs['actions']['createPage'], { id, component, context }: GenerateOpenGraphImageOptions) {
	console.debug(`Generating Open Graph image for ${id}`);

	createOpenGraphImage(createPage, {
		outputDir: OG_IMAGE_DIR,
		component: component,
		context: {
			id: id,
			...context,
		},
	});
}


// Entry point
export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
	const pinnedReposResponseData = await fetchPinnedRepos(graphql);
	const pinnedRepos = pinnedReposResponseData.map(responseData => {
		assertResponseDataIsNonEmpty(responseData);

		const projectInfo = ResponseMapper.map(ResponseParser.parse(responseData as PinnedRepoResponseInterface));

		// Create project pages
		createPage({
			path: path.join('/', PROJECTS_DIR, projectInfo.slug),
			component: PROJECT_PAGE_TEMPLATE,
			context: {
				repo: projectInfo,
			}
		});

		generateOpenGraphImage(createPage, {
			id: projectInfo.slug,
			component: PROJECT_OG_IMAGE_TEMPLATE,
			context: {
				repo: projectInfo,
			}
		});

		return projectInfo;
	});

	// Create landing page
	createPage({
		path: '/',
		component: INDEX_PAGE_TEMPLATE,
		context: {
			pinnedRepos: pinnedRepos,
		}
	});

	// Create Open Graph images
	generateOpenGraphImage(createPage, {
		id: 'index',
		component: INDEX_OG_IMAGE_TEMPLATE,
	});
	generateOpenGraphImage(createPage, {
		id: 'privacy-policy',
		component: OTHER_OG_IMAGE_TEMPLATE,
		context: {
			pageName: 'Privacy Policy',
		}
	});
	generateOpenGraphImage(createPage, {
		id: '404',
		component: OTHER_OG_IMAGE_TEMPLATE,
		context: {
			pageName: '404',
		}
	});
}
