/*
	A class with methods to parse responses from the GitHub GraphQL API
	-------------------------------------------------------------------
*/

import { JSDOM } from 'jsdom';
import type {
	PinnedReposResponseInterface,
	ProjectInfoInterface,
	ProjectLanguageInterface,
	ReadmeResponse,
} from '../common/types';

type ReadmePropsInterface = Pick<
	Partial<ProjectInfoInterface>,
	'name' | 'longDesc' | 'typeName' | 'typeColor'
>;

// Extract a project's name from its README
function getProjectName(fragment: DocumentFragment): string | undefined {
	const linkElement = fragment.querySelector('.projectName > a');

	// Get the project name from from the nested link element if it exists
	if (linkElement) {
		return (
			linkElement.getAttribute('title') || linkElement.textContent || undefined
		);
	}

	return fragment.querySelector('.projectName')?.textContent || undefined;
}

// Extract a project's description from its README
function getProjectDesc(fragment: DocumentFragment): string | undefined {
	return fragment.querySelector('.projectDesc')?.textContent || undefined;
}

// Extract a project's type from its README
function getProjectType(
	fragment: DocumentFragment,
): { name: string; color: string } | undefined {
	const badgeImgUrl = fragment
		.querySelector('.projectBadges > img[alt="Project type"]')
		?.getAttribute('src');

	if (!badgeImgUrl) {
		return undefined;
	}

	const matches = /type-(\w+)-(\w+)/.exec(badgeImgUrl);

	if (!matches || matches.length < 3) {
		return undefined;
	}

	return {
		name: matches[1].replace(/_/g, ' '),
		color: matches[2],
	};
}

function parseReadme<R extends ReadmePropsInterface>(
	slug: string,
	readmeObj: ReadmeResponse,
): R {
	const propsFromReadme = {
		name: undefined,
		longDesc: undefined,
		typeName: undefined,
		typeColor: undefined,
	} as R;

	if (!readmeObj || !('text' in readmeObj)) {
		console.warn(`[${slug}] No README found`);

		return propsFromReadme;
	}

	const fragment = JSDOM.fragment(readmeObj.text);

	propsFromReadme.name = getProjectName(fragment);
	propsFromReadme.longDesc = getProjectDesc(fragment);

	const projectType = getProjectType(fragment);

	if (!projectType) {
		return propsFromReadme;
	}

	propsFromReadme.typeName = projectType.name;
	propsFromReadme.typeColor = projectType.color;

	return propsFromReadme;
}

export function parseResponse(
	responseData: PinnedReposResponseInterface,
): Partial<ProjectInfoInterface> {
	const slug = getProp(responseData, 'name');

	if (!slug) {
		throw new Error('Pinned repo has no slug');
	}

	const languages = getProp(
		getProp(responseData, 'languages'),
		'nodes',
	)?.filter(
		(language) => language && 'name' in language && 'color' in language,
	) as ProjectLanguageInterface[];
	const { name, longDesc, typeName, typeColor } = parseReadme(
		slug,
		getProp(responseData, 'readmeFromMaster') ||
			getProp(responseData, 'readmeFromMain') ||
			getProp(responseData, 'readmeFromGhPages'),
	);

	return {
		slug: slug,
		shortDesc: getProp(responseData, 'description'),
		homepageUrl: getProp(responseData, 'homepageUrl'),
		githubUrl: getProp(responseData, 'githubUrl'),
		imageUrl: responseData.usesCustomOpenGraphImage
			? responseData.openGraphImageUrl
			: undefined,
		stargazers: getProp(responseData, 'stargazerCount'),
		updatedAt: getProp(responseData, 'updatedAt'),
		license: getProp(getProp(responseData, 'licenseInfo'), 'spdxId'),
		licenseUrl: getProp(getProp(responseData, 'licenseInfo'), 'url'),
		languages: languages,
		name,
		longDesc,
		typeName,
		typeColor,
	};
}

// Returns a prop if it exists, otherwise returns undefined
function getProp<T extends { [key: string]: any }, K extends keyof T>(
	obj: T | object | undefined,
	key: K,
): Exclude<T[K], null> | undefined {
	return (obj && key in obj && obj[key]) || undefined;
}
