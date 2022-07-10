import { ProjectInfoInterface } from './src/common/types';

const path = require('path');
const indexPageTemplate = path.resolve('./src/templates/index.tsx');
const projectPageTemplate = path.resolve('./src/templates/project-page.tsx');


interface ReadmeQueryResponseInterface {
	text: string;
}


interface RepoQueryResponseInterface {
	name: string;
	description: string;
	homepageUrl: string;
	githubUrl: string;
	usesCustomOpenGraphImage: boolean;
	openGraphImageUrl: string;
	stargazerCount: number;
	updatedAt: string;
	licenseInfo: {
		spdxId: string;
	};
	languages: {
		nodes: {
			name: string;
			color: string;
		}[];
	};
	readmeFromMaster: ReadmeQueryResponseInterface;
	readmeFromMain: ReadmeQueryResponseInterface;
	readmeFromGhPages: ReadmeQueryResponseInterface;
}


class ResponseParser {
	static colorMap = {
		red: '#f44336',
		orange: '#ff5722',
		yellow: '#ffc107',
		brightgreen: '#4caf50',
		blue: '#2196f3',
		purple: '#9c27b0',
		gray: '#333333',
	};
	static langMap = {
		JavaScript: 'JS',
		TypeScript: 'TS'
	};
	static defaultText = 'Unknown';
	static defaultTypeColor = this.colorMap.gray;

	// Print a warning if we need to use fallback values for a property
	private static warnOnSubstitution(slug: string, fallbackProperty: string, property: string) {
		console.warn(`[${slug}] Using ${fallbackProperty} instead of ${property}`);
	}

	private static colorStringToHex(slug: string, colorString: string) {
		if (colorString in this.colorMap) {
			this.warnOnSubstitution(slug, 'named color', 'hex color');

			return this.colorMap[colorString];
		} else if (/^[a-f0-9]{6}$/i.exec(colorString)) {
			return `#${colorString}`;
		}

		return this.defaultTypeColor;
	}

	private static toTitleCase(sentence: string) {
		// TODO: Replace deprecated method
		return sentence.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1));
	}

	private static getName(slug: string, readmeText: string) {
		if (readmeText) {
			// If no match, than maybe the title is a URL, so parse accordingly
			const match = /# ([\w \d]{1,64})(?: \[|\n)/i.exec(readmeText) || /# \[(.{1,64})\]\(.{1,64}\)/.exec(readmeText);

			if (match && match.length > 1) {
				return match[1];
			}
		}

		// If we can't extract a title from the README, try to build a project name from the slug
		this.warnOnSubstitution(slug, 'slug', 'project name');

		return this.toTitleCase(slug.replace(/[_-]/g, ' ')) || this.defaultText;
	}

	private static getLongDesc(slug: string, shortDesc: string, readmeText: string) {
		if (readmeText) {
			const match = /\]\(LICENSE\)\n{1,6}((?:.*\n{1,2}){1,3})\n{1,6}#/i.exec(readmeText);

			if (match && match.length > 1) {
				return match[1];
			}
		}

		// If we can't extract a long project description from the README, use the short description instead
		this.warnOnSubstitution(slug, 'short desc', 'long desc');

		return shortDesc || 'Nothing here yet :(';
	}

	private static getProjectTypeAndColor(slug: string, readmeText: string) {
		if (readmeText) {
			const match = /\/type-(\w{1,64})-(\w{1,64})\./i.exec(readmeText);

			if (match && match.length > 2) {
				const typeName = match[1].replace(/_/g, ' ');
				const typeColor = this.colorStringToHex(slug, match[2]);

				return [typeName, typeColor];
			}
		}

		// If we can't extract the project type and color from the README, return the default instead
		this.warnOnSubstitution(slug, 'default project type/color', 'specific project type/color');

		return [this.defaultText, this.defaultTypeColor];
	}

	private static parseReadme(slug: string, shortDesc: string, readme: { text: string; }) {
		let readmeText = '';

		if (readme) {
			readmeText = readme.text;
		} else {
			console.warn(`[${slug}] No README found`);
		}

		const name = this.getName(slug, readmeText);
		const longDesc = this.getLongDesc(slug, shortDesc, readmeText);
		const [typeName, typeColor] = this.getProjectTypeAndColor(slug, readmeText);

		return [name, longDesc, typeName, typeColor];
	}

	public static parse(repo: RepoQueryResponseInterface): ProjectInfoInterface {
		const result = {} as ProjectInfoInterface;

		result['slug'] = repo.name || this.defaultText;
		result['shortDesc'] = repo.description || this.defaultText;
		result['homepageUrl'] = repo.homepageUrl || '';
		result['githubUrl'] = repo.githubUrl || '';
		result['imageUrl'] = repo.usesCustomOpenGraphImage ? repo.openGraphImageUrl : '';
		result['stargazers'] = repo.stargazerCount || 0;
		result['updatedAt'] = repo.updatedAt || this.defaultText;
		result['license'] = repo.licenseInfo.spdxId || this.defaultText;
		result['languages'] = repo.languages.nodes.map(language => {
			return {
				name: this.langMap[language.name] || language.name,
				color: language.color
			}
		});

		const readme = repo.readmeFromMaster || repo.readmeFromMain || repo.readmeFromGhPages;
		const [name, longDesc, typeName, typeColor] = this.parseReadme(result['slug'], result['shortDesc'], readme);

		result['name'] = name;
		result['longDesc'] = longDesc;
		result['typeName'] = typeName;
		result['typeColor'] = typeColor;

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

	if ('errors' in response) {
		throw new Error('The response from GitHub contains errors');
	}

	const pinnedRepos = response.data.github.user.pinnedItems.nodes.map((data: RepoQueryResponseInterface) => {
		const repo = ResponseParser.parse(data);

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
