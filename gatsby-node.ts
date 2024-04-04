import path from 'path';
import type { GatsbyNode } from 'gatsby';
import ResponseParser from './src/node/response-parser';
import ResponseMapper from './src/node/response-mapper';
import { PinnedRepoResponseInterface } from './src/common/types';


const projectsPagePath = 'projects';
const indexPageTemplate = path.resolve('./src/templates/index.tsx');
const projectPageTemplate = path.resolve('./src/templates/project-page.tsx');


// Exports

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
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
		throw new Error('The response from GitHub contains errors');
	}

	const data = response.data as Queries.PinnedRepoQueryQuery;
	const pinnedItems = data.github.user?.pinnedItems.nodes;

	if (!pinnedItems) {
		throw new Error('No pinned repos found');
	}

	const pinnedRepos = pinnedItems.map(responseData => {
		if (!responseData || Object.keys(responseData).length === 0) {
			throw new Error('Pinned repo does not contain any data');
		}

		const projectInfo = ResponseMapper.map(ResponseParser.parse(responseData as PinnedRepoResponseInterface));

		// Create project pages
		actions.createPage({
			path: `/${projectsPagePath}/${projectInfo.slug}`,
			component: projectPageTemplate,
			context: projectInfo
		});

		return projectInfo;
	});

	// Create landing page
	actions.createPage({
		path: '/',
		component: indexPageTemplate,
		context: {
			pinnedRepos: pinnedRepos
		}
	});
};
