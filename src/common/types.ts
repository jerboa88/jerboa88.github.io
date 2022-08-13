/*
	Common types used in the project
	--------------------------------
*/


import { Context, RefObject } from 'react';


export interface DaisyUiThemeInterface {
	'accent': string;
	'accent-content': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
	'base-content': string;
	'neutral': string;
	'neutral-content': string;
	'neutral-focus': string;
	'primary': string;
	'primary-content': string;
	'secondary': string;
	'secondary-content': string;
}


// This needs to be a type rather than an interface due to existing TS 'functionality'
// See https://github.com/microsoft/TypeScript/issues/15300 for more details
export type MetadataInterface = {
	shortTitle: string;
	title: string;
	author: string;
	authorUsername: string;
	shortDescription: string;
	description: string;
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: string;
	githubUrl: string;
	trackingId: string;
}


export type ThemeInterface = {
	'primary-header': string;
	'primary': string;
	'secondary-header': string;
	'secondary': string;
	'accent': string;
	'neutral': string;
	'info': string;
	'success': string;
	'warning': string;
	'error': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
}


export interface SectionInterface {
	id: string;
	title: string;
	ref: RefObject<HTMLElement>;
}


export interface ProjectLanguageInterface {
	name: string;
	color: string;
}


export interface ProjectInfoInterface {
	slug: string;
	shortDesc: string;
	homepageUrl: string;
	githubUrl: string;
	imageUrl: string;
	stargazers: number;
	updatedAt: string;
	license: string;
	languages: ProjectLanguageInterface[];
	name: string;
	longDesc: string;
	typeName: string;
	typeColor: string;
}


// Queries.PinnedRepoQueryQuery['github']['user']['pinnedItems']
export type PinnedRepoResponseInterface = {
	name: string;
	description: string | null;
	homepageUrl: any;
	usesCustomOpenGraphImage: boolean;
	openGraphImageUrl: any;
	stargazerCount: number;
	updatedAt: any;
	githubUrl: any;
	languages: {
		nodes: ({
			name: string;
			color: string | null;
		} | null)[] | null;
	} | null;
	licenseInfo: {
		spdxId: string | null;
		name: string;
		url: any;
	} | null;
	readmeFromMaster: {} | {
		text: string | null;
	} | null;
	readmeFromMain: {} | {
		text: string | null;
	} | null;
	readmeFromGhPages: {} | {
		text: string | null;
	} | null;
}


export type ToggleContextInterface = Context<{
	isEnabled: boolean;
	toggle: () => void;
}>
