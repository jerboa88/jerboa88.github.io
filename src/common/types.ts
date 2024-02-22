/*
	Common types used in the project
	--------------------------------
*/


import { Context, RefObject } from 'react';


// Raw site metadata config
export interface SiteMetadataConfigInterface {
	shortTitle: string;
	title: string;
	shortDescription: string;
	description: string;
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: string;
	sourceUrl: string;
	trackingId: string;
	author: {
		firstName: string;
		lastName: string;
		jobTitle: string;
		alumniOf: string;
		image: string;
		username: {
			linkedin: string;
			github: string;
			twitter: string;
		},
		location: {
			city: string;
			state: string;
			country: string;
		},
	}
}


// Site metadata object used to populate the site's metadata
export interface SiteMetadataInterface {
	shortTitle: string;
	title: string;
	tagline: string;
	shortDescription: string;
	description: string;
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: string;
	sourceUrl: string;
	trackingId: string;
	author: {
		firstName: string;
		lastName: string;
		fullName: string;
		jobTitle: string;
		alumniOf: string;
		image: string;
		username: {
			twitter: string;
		},
		link: {
			linkedin: string;
			github: string;
			twitter: string;
		},
		location: {
			city: string;
			state: string;
			country: string;
		},
	}
}


// Raw theme config for a single theme
interface ThemeConfigInterface {
	'accent': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
	'error': string;
	'info': string;
	'neutral': string;
	'primary-header': string;
	'primary': string;
	'secondary-header': string;
	'secondary': string;
	'success': string;
	'warning': string;
}


// Raw themes config used to generate theme objects
export interface ThemesConfigInterface {
	light: ThemeConfigInterface;
	dark: ThemeConfigInterface;
}


// Theme object used to style the site
export interface ThemeInterface extends ThemeConfigInterface {
	'--ph': string;
	'--sh': string;
	'accent-content': string;
	'error-content': string;
	'info-content': string;
	'primary-content': string;
	'secondary-content': string;
	'success-content': string;
	'warning-content': string;
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
