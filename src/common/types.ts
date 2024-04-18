/*
	Common types used in the project
	--------------------------------
*/


import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Context, RefObject } from 'react';


// Props for components that accept an optional class name
export interface PropsWithClassName {
	className?: string;
}


// Raw site metadata config
export interface SiteMetadataConfigInterface {
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: string;
	sourceUrl: string;
	trackingId: string;
	author: {
		name: {
			first: string;
			last: string;
		};
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
		name: {
			first: string;
			last: string;
			initial: string;
			short: string;
			full: string;
		}
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


// Tailwind CSS background color
export type BgColor = `bg-${string}`;


// Color mappings for project types
export interface ProjectTypeColorMappingsInterface {
	'android app': BgColor;
	'extension': BgColor;
	'cli app': BgColor;
	'js library': BgColor;
	'node.js module': BgColor;
	'markdown': BgColor;
	'website': BgColor;
	'web app': BgColor;
	'gimp plugin': BgColor;
	'other': BgColor;
}


// Color mappings for role types
export interface RoleTypeColorMappingsInterface {
	'internship': BgColor;
	'summer job': BgColor;
}


// Raw color mappings config used to generate color mappings
export interface ColorMappingsConfigInterface {
	projectType: ProjectTypeColorMappingsInterface;
	roleType: RoleTypeColorMappingsInterface;
}


export interface SectionInterface {
	id: string;
	title: string;
	ref: RefObject<HTMLElement>;
	button?: {
		text: string;
		icon: IconDefinition;
		to: string;
	}
}

export interface LinkInterface {
	to: string;
	isInternal?: boolean;
	rel?: string;
}


export interface ButtonInterface extends PropsWithClassName {
	iconClassName?: string;
	textClassName?: string;
	type?: 'button' | 'submit' | 'reset';
	icon?: IconDefinition;
	text?: string | number;
	disabled?: boolean;
	responsive?: boolean;
	flip?: boolean;
}


export interface InputInterface extends PropsWithClassName {
	labelClassName?: string;
	inputClassName?: string;
	type?: string;
	name: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
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


// Raw role config
export interface RoleConfigInterface {
	type: 'internship' | 'summer job';
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	location: string;
	tasks: string[];
}


// Role object used to represent jobs and volunteer positions
export interface RoleInterface {
	type: 'internship' | 'summer job';
	title: string;
	company: string;
	startDate: Date;
	endDate: Date;
	location: string;
	tasks: string[];
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
