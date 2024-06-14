/*
	A class with methods to map responses from the GitHub GraphQL API
	-------------------------------------------------------------------
*/

import type {
	ProjectInfoInterface,
	ProjectLanguageInterface,
} from '../common/types';

// Exports

export default class ResponseMapper {
	static colorMap = {
		red: '#f44336',
		orange: '#ff5722',
		yellow: '#ffc107',
		brightgreen: '#4caf50',
		blue: '#2196f3',
		purple: '#9c27b0',
		gray: '#333333',
	};
	static defaultTypeColor = this.colorMap.gray;
	static langMap = {
		JavaScript: 'JS',
		TypeScript: 'TS',
	};
	static defaultText = 'Unknown';

	// Print a warning if we need to use fallback values for a property
	// private static warnOnSubstitution(slug: string, fallbackProperty: string, property: string) {
	// 	console.warn(`[${slug}] Using ${fallbackProperty} instead of ${property}`);
	// }

	private static mapColorStringToHex(colorString: string) {
		if (this.colorMap.hasOwnProperty(colorString)) {
			return this.colorMap[colorString as keyof typeof this.colorMap];
		} else if (/^[a-f0-9]{6}$/i.exec(colorString)) {
			return `#${colorString}`;
		}

		return this.defaultTypeColor;
	}

	private static mapLanguages(languages: ProjectLanguageInterface[]) {
		return languages.map((language) => {
			const propsFromLanguage = {
				name: language.name || this.defaultText,
				color: language.color || this.defaultTypeColor,
			};

			if (!language.name || !language.color) {
				return propsFromLanguage;
			}

			if (this.langMap.hasOwnProperty(language.name)) {
				propsFromLanguage.name =
					this.langMap[language.name as keyof typeof this.langMap];
			}

			return propsFromLanguage;
		});
	}

	private static mapSlugToName(slug: string) {
		return slug
			.split('-')
			.map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
			.join(' ');
	}

	private static assertExists<
		T extends Partial<ProjectInfoInterface>,
		K extends keyof T,
	>(obj: T, key: K): Required<T>[K] {
		if (obj.hasOwnProperty(key)) {
			const property = obj[key];

			if (property) {
				return property;
			}
		}

		const slug = (obj.hasOwnProperty('slug') && obj.slug) || 'Unknown';

		throw new TypeError(
			`[${slug}] Required property '${String(key)}' is missing from project info`,
		);
	}

	private static useFallback<
		T extends Partial<ProjectInfoInterface>,
		K extends keyof T,
	>(obj: T, key: K, fallbackValue: T[K]): Required<T>[K] {
		if (obj.hasOwnProperty(key)) {
			const property = obj[key];

			if (property) {
				return property;
			}
		}

		// Allow empty strings
		if (fallbackValue !== undefined) {
			return fallbackValue;
		}

		const slug = (obj.hasOwnProperty('slug') && obj.slug) || 'Unknown';

		throw new TypeError(
			`[${slug}] Required property '${String(key)}' and fallback value are missing from project info`,
		);
	}

	public static map(
		projectInfo: Partial<ProjectInfoInterface>,
	): ProjectInfoInterface {
		const slug = this.assertExists(projectInfo, 'slug');

		return {
			slug: slug,
			shortDesc: this.useFallback(
				projectInfo,
				'shortDesc',
				projectInfo.longDesc,
			),
			homepageUrl: this.useFallback(projectInfo, 'homepageUrl', ''),
			githubUrl: this.assertExists(projectInfo, 'githubUrl'),
			imageUrl: projectInfo.imageUrl || '',
			stargazers: this.useFallback(projectInfo, 'stargazers', 0),
			updatedAt: this.assertExists(projectInfo, 'updatedAt'),
			license: this.assertExists(projectInfo, 'license'),
			languages: this.mapLanguages(this.assertExists(projectInfo, 'languages')),
			name: this.useFallback(projectInfo, 'name', this.mapSlugToName(slug)),
			longDesc: this.useFallback(
				projectInfo,
				'longDesc',
				projectInfo.shortDesc,
			),
			typeName: this.assertExists(projectInfo, 'typeName'),
			typeColor: this.mapColorStringToHex(
				this.assertExists(projectInfo, 'typeColor'),
			),
		};
	}
}
