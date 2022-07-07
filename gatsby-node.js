'use strict';

const path = require('path');
const indexPageTemplate = path.resolve('./src/templates/index.jsx');
const projectPageTemplate = path.resolve('./src/templates/project-page.jsx');


class ResponseParser {
	#colorMap;
	#langMap;
	#defaultText;
	#defaultTypeColor;

	constructor() {
		this.#colorMap = {
			red: '#f44336',
			orange: '#ff5722',
			yellow: '#ffc107',
			brightgreen: '#4caf50',
			blue: '#2196f3',
			purple: '#9c27b0',
			gray: '#616161'
		};
		this.#langMap = {
			JavaScript: 'JS',
			TypeScript: 'TS'
		};
		this.#defaultText = 'Unknown';
		this.#defaultTypeColor = this.#colorMap.gray;
	}

	// TODO: Make this an actual private method
	#colorStringToHex(colorString) {
		return this.#colorMap[colorString] || this.#defaultTypeColor;
	}

	// TODO: Make this an actual private method
	#toTitleCase(str) {
		return str.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1));
	}

	// TODO: Make this an actual private method
	#getName(slug, md) {
		if (md) {
			// If no match, than maybe the title is a URL, so parse accordingly
			const match = /# ([\w \d]{1,64})(?: \[|\n)/i.exec(md) || /# \[(.{1,64})\]\(.{1,64}\)/.exec(md);

			if (match && match.length > 1) {
				return match[1];
			}
		}

		// If we can't extract a title from the README, try to build a project name from the slug
		console.warn(`Building project name from slug instead of extracting from README for ${slug}`);

		return this.#toTitleCase(slug.replace(/[_-]/g, ' ')) || this.#defaultText;;
	}

	// TODO: Make this an actual private method
	#getLongDesc(slug, shortDesc, md) {
		if (md) {
			const match = /\]\(LICENSE\)\n{1,6}((?:.*\n{1,2}){1,3})\n{1,6}#/i.exec(md);

			if (match && match.length > 1) {
				return match[1];
			}
		}

		// If we can't extract a long project description from the README, use the short description instead
		console.warn(`Using short description in place of long description for ${slug}`);

		return shortDesc || 'Nothing here yet :(';
	}

	// TODO: Make this an actual private method
	#getProjectTypeAndColor(slug, md) {
		if (md) {
			const match = /\/type-(\w{1,64})-(\w{1,64})\./i.exec(md);

			if (match && match.length > 2) {
				const typeName = match[1].replace(/_/g, ' ');
				const typeColor = this.#colorStringToHex(match[2]);

				return [typeName, typeColor];
			}
		}

		// If we can't extract the project type and color from the README, return the default instead
		console.warn(`Using default project type and color for ${slug}`);

		return [this.#defaultText, this.#defaultTypeColor];
	}

	// TODO: Make this an actual private method
	#parseReadme(slug, shortDesc, readme) {
		let md = false;

		if (readme) {
			md = readme.text;
		} else {
			console.warn(`No README found for ${slug}`);
		}

		const name = this.#getName(slug, md);
		const longDesc = this.#getLongDesc(slug, shortDesc, md);
		const [typeName, typeColor] = this.#getProjectTypeAndColor(slug, md);

		return [name, longDesc, typeName, typeColor];
	}

	parse(repo) {
		const result = {};

		result['slug'] = repo.name || this.#defaultText;
		result['shortDesc'] = repo.description || this.#defaultText;
		result['homepageUrl'] = repo.homepageUrl || '';
		result['url'] = repo.url || '';
		result['imageUrl'] = repo.usesCustomOpenGraphImage ? repo.openGraphImageUrl : '';
		result['stargazers'] = repo.stargazerCount || 0;
		result['updatedAt'] = repo.updatedAt || this.#defaultText;
		result['license'] = repo.licenseInfo.spdxId || this.#defaultText;
		result['languages'] = repo.languages.nodes.map(language => {
			language.name = this.#langMap[language.name] || language.name;

			return language;
		});

		const [name, longDesc, typeName, typeColor] = this.#parseReadme(result['slug'], result['shortDesc'], repo.readme || repo.readmeAlt || repo.readmeAlt2);

		result['name'] = name;
		result['longDesc'] = longDesc;
		result['typeName'] = typeName;
		result['typeColor'] = typeColor;
		// TODO: Remove this
		// result['rawReadme'] = repo.readme

		return result;
	}
}


exports.createPages = async ({ actions, graphql }) => {
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
								readme: object(expression: "master:README.md") {
									... on GITHUB_Blob {
										text
									}
								}
								readmeAlt: object(expression: "main:README.md") {
									... on GITHUB_Blob {
										text
									}
								}
								readmeAlt2: object(expression: "gh-pages:README.md") {
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

	const rp = new ResponseParser();

	if ('errors' in response) {
		throw new Error('The response from GitHub contains errors');
	}

	const pinnedRepos = response.data.github.user.pinnedItems.nodes.map(data => {
		const repo = rp.parse(data);

		// Create project pages
		actions.createPage({
			path: repo.slug,
			component: projectPageTemplate,
			context: repo
		});

		return repo;
	});

	// Create homepage
	actions.createPage({
		path: '/',
		component: indexPageTemplate,
		context: {
			pinnedRepos: pinnedRepos
		}
	});
};
