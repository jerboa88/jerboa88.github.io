/*
	A class with methods to map responses from the GitHub GraphQL API
	-------------------------------------------------------------------
*/

import type { ProjectInfo, ProjectLanguage } from '../common/types';

const COLOR_MAP = {
	red: '#f44336',
	orange: '#ff5722',
	yellow: '#ffc107',
	brightgreen: '#4caf50',
	blue: '#2196f3',
	purple: '#9c27b0',
	gray: '#333333',
} as const;
const COLOR_DEFAULT = COLOR_MAP.gray;
const LANGUAGE_MAP = {
	javascript: 'JS',
	typescript: 'TS',
} as const;
const TEXT_DEFAULT = 'Unknown' as const;

function mapColorStringToHex(colorString: string) {
	if (Object.hasOwn(COLOR_MAP, colorString)) {
		return COLOR_MAP[colorString as keyof typeof COLOR_MAP];
	}
	if (/^[a-f0-9]{6}$/i.exec(colorString)) {
		return `#${colorString}`;
	}

	return COLOR_DEFAULT;
}

function mapLanguages(languages: ProjectLanguage[]) {
	return languages.map((language) => {
		const propsFromLanguage = {
			name: language.name || TEXT_DEFAULT,
			color: language.color || COLOR_DEFAULT,
		};

		if (!(language.name && language.color)) {
			return propsFromLanguage;
		}

		if (Object.hasOwn(LANGUAGE_MAP, language.name)) {
			propsFromLanguage.name =
				LANGUAGE_MAP[language.name.toLowerCase() as keyof typeof LANGUAGE_MAP];
		}

		return propsFromLanguage;
	});
}

function mapSlugToName(slug: string) {
	return slug
		.split('-')
		.map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
		.join(' ');
}

function assertExists<T extends Partial<ProjectInfo>, K extends keyof T>(
	obj: T,
	key: K,
): Required<T>[K] {
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

function useFallback<T extends Partial<ProjectInfo>, K extends keyof T>(
	obj: T,
	key: K,
	fallbackValue: T[K],
): Required<T>[K] {
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

export function mapResponse(projectInfo: Partial<ProjectInfo>): ProjectInfo {
	const slug = assertExists(projectInfo, 'slug');

	return {
		slug: slug,
		shortDesc: useFallback(projectInfo, 'shortDesc', projectInfo.longDesc),
		homepageUrl: useFallback(projectInfo, 'homepageUrl', ''),
		githubUrl: assertExists(projectInfo, 'githubUrl'),
		imageUrl: projectInfo.imageUrl || '',
		stargazers: useFallback(projectInfo, 'stargazers', 0),
		updatedAt: assertExists(projectInfo, 'updatedAt'),
		license: assertExists(projectInfo, 'license'),
		languages: mapLanguages(assertExists(projectInfo, 'languages')),
		name: useFallback(projectInfo, 'name', mapSlugToName(slug)),
		longDesc: useFallback(projectInfo, 'longDesc', projectInfo.shortDesc),
		typeName: assertExists(projectInfo, 'typeName'),
		typeColor: mapColorStringToHex(assertExists(projectInfo, 'typeColor')),
	};
}
