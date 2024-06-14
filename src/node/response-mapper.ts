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
		if (Object.hasOwn(ResponseMapper.colorMap, colorString)) {
			return ResponseMapper.colorMap[colorString as keyof typeof this.colorMap];
		}
		if (/^[a-f0-9]{6}$/i.exec(colorString)) {
			return `#${colorString}`;
		}

		return ResponseMapper.defaultTypeColor;
	}

	private static mapLanguages(languages: ProjectLanguageInterface[]) {
		return languages.map((language) => {
			const propsFromLanguage = {
				name: language.name || ResponseMapper.defaultText,
				color: language.color || ResponseMapper.defaultTypeColor,
			};

			if (!language.name || !language.color) {
				return propsFromLanguage;
			}

			if (Object.hasOwn(ResponseMapper.langMap, language.name)) {
				propsFromLanguage.name =
					ResponseMapper.langMap[language.name as keyof typeof this.langMap];
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
		if (Object.hasOwn(obj, key)) {
			const property = obj[key];

			if (property) {
				return property;
			}
		}

		const slug = (Object.hasOwn(obj, 'slug') && obj.slug) || 'Unknown';

		throw new TypeError(
			`[${slug}] Required property '${String(key)}' is missing from project info`,
		);
	}

	private static useFallback<
		T extends Partial<ProjectInfoInterface>,
		K extends keyof T,
	>(obj: T, key: K, fallbackValue: T[K]): Required<T>[K] {
		if (Object.hasOwn(obj, key)) {
			const property = obj[key];

			if (property) {
				return property;
			}
		}

		// Allow empty strings
		if (fallbackValue !== undefined) {
			return fallbackValue;
		}

		const slug = (Object.hasOwn(obj, 'slug') && obj.slug) || 'Unknown';

		throw new TypeError(
			`[${slug}] Required property '${String(key)}' and fallback value are missing from project info`,
		);
	}

	public static map(
		projectInfo: Partial<ProjectInfoInterface>,
	): ProjectInfoInterface {
		const slug = ResponseMapper.assertExists(projectInfo, 'slug');

		return {
			slug: slug,
			shortDesc: ResponseMapper.useFallback(
				projectInfo,
				'shortDesc',
				projectInfo.longDesc,
			),
			homepageUrl: ResponseMapper.useFallback(projectInfo, 'homepageUrl', ''),
			githubUrl: ResponseMapper.assertExists(projectInfo, 'githubUrl'),
			imageUrl: projectInfo.imageUrl || '',
			stargazers: ResponseMapper.useFallback(projectInfo, 'stargazers', 0),
			updatedAt: ResponseMapper.assertExists(projectInfo, 'updatedAt'),
			license: ResponseMapper.assertExists(projectInfo, 'license'),
			languages: ResponseMapper.mapLanguages(
				ResponseMapper.assertExists(projectInfo, 'languages'),
			),
			name: ResponseMapper.useFallback(
				projectInfo,
				'name',
				ResponseMapper.mapSlugToName(slug),
			),
			longDesc: ResponseMapper.useFallback(
				projectInfo,
				'longDesc',
				projectInfo.shortDesc,
			),
			typeName: ResponseMapper.assertExists(projectInfo, 'typeName'),
			typeColor: ResponseMapper.mapColorStringToHex(
				ResponseMapper.assertExists(projectInfo, 'typeColor'),
			),
		};
	}
}
