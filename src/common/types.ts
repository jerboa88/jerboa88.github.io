/*
	Common types used in the project
	--------------------------------
*/


import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LayoutProps } from 'framer-motion';
import { Context, RefObject } from 'react';
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';


// Props for components that accept an optional class name
export interface PropsWithClassName {
	className?: string;
}


// Props for components that accept optional layout animations
export interface PropsWithLayoutAnimations {
	layout?: LayoutProps['layout'];
	layoutRoot?: LayoutProps['layoutRoot'];
}


// Tailwind CSS background color
export type BgColor = `bg-${string}`;


// HTTPS URL
type Url = `https://${string}`;


// Raw external services config
export interface ExternalServicesConfigInterface {
	botpoisonPublicKey: `pk_${string}`;
	contactFormPostUrl: Url;
}


// Raw site metadata config
export interface SiteMetadataConfigInterface {
	iconPath: string;
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: Url;
	sourceUrl: Url;
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
	iconPath: string;
	ogImagePath: string;
	ogImageAltText: string;
	siteUrl: Url;
	sourceUrl: Url;
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


export interface ButtonInterface extends PropsWithClassName, PropsWithLayoutAnimations {
	iconClassName?: string;
	textClassName?: string;
	type?: React.ButtonHTMLAttributes<any>['type'];
	icon?: IconDefinition;
	text?: string | number;
	disabled?: boolean;
	responsive?: boolean;
	flip?: boolean;
}


// Possible options for input validation using react-hook-form
export interface InputValidationOptions {
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	required?: boolean;
	disabled?: boolean;
}

// Common options for different input elements
export interface InputOptions {
	tabIndex?: React.HTMLAttributes<HTMLInputElement>['tabIndex'];
	// autocomplete is not supposed to have any effect on checkbox and radio inputs, but Firefox uses it anyway
	autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
}


export interface InputElementRenderFunction {
	(props: UseFormRegisterReturn<string>): JSX.Element;
}


export interface InputInterface extends PropsWithClassName, PropsWithLayoutAnimations {
	labelClassName?: string;
	inputClassName?: string;
	name: string;
	label?: string;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validationOptions?: InputValidationOptions;
}


export enum AlertType {
	Info,
	Success,
	Warning,
	Error,
}


export interface ProjectLanguageInterface {
	name: string;
	color: string;
}


export interface ProjectInfoInterface {
	slug: string;
	shortDesc: string;
	homepageUrl: Url;
	githubUrl: Url;
	imageUrl: Url;
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
	homepageUrl: Url;
	usesCustomOpenGraphImage: boolean;
	openGraphImageUrl: any;
	stargazerCount: number;
	updatedAt: any;
	githubUrl: Url;
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
