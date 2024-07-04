/*
	Common types used in the project
	--------------------------------
*/

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { LayoutProps } from 'framer-motion';
import type {
	DefaultOptions,
	JobOptions,
} from 'gatsby-plugin-component-to-image/lib/types';
import type { Context, RefObject } from 'react';
import type {
	FieldErrors,
	UseFormRegister,
	UseFormRegisterReturn,
} from 'react-hook-form';

// An object with no keys
export type EmptyObject = Record<string, never>;

// Extend a type, overwriting existing properties with new ones
export type Overwrite<T, U> = Omit<T, keyof U> & U;

// Props for components that accept an optional class name
export interface PropsWithClassName {
	className?: string;
}

// Props for components that accept optional layout animations
export interface PropsWithLayoutAnimations {
	layout?: LayoutProps['layout'];
	layoutRoot?: LayoutProps['layoutRoot'];
}

// Tailwind CSS background color string
export type BgColorString = `bg-${string}`;

// Absolute path string
export type AbsolutePathString = `/${string}`;

// Working path string
export type WorkingPathString = `./${string}`;

// HTTPS URL string
export type UrlString = `https://${string}`;

// Date string in the format YYYY-MM-DD
type DateString = `${20}${number}-${number}-${number}`;

// City and state string
export type CityAndStateString = Capitalize<`${string}, ${string}`>;

// Sentence string with proper capitalization and punctuation
export type SentenceString = Capitalize<`${string}${'.' | '!' | '?'}`>;

// Raw external services config
export interface ExternalServicesConfig {
	botpoisonPublicKey: `pk_${string}`;
	contactFormPostUrl: UrlString;
}

// Raw site metadata config
export interface SiteMetadataConfig {
	iconPath: string;
	siteUrl: UrlString;
	sourceUrl: UrlString;
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
		};
		location: {
			city: string;
			state: string;
			country: string;
		};
	};
}

// Page metadata fields
export interface PageMetadata {
	title: string;
	shortTitle: string;
	description: string;
}

// Page metadata added to pageContext when pages are created
export interface PageMetadataProp {
	pageMetadata: PageMetadata;
}

// Raw pages metadata config
export interface PagesMetadataConfig {
	[pagePath: AbsolutePathString]: PageMetadata;
}

// TODO: Use this type in interfaces below
// TODO: Change this to an enum
export type SocialImageTypes = 'og' | 'twitter';

// Raw social image metadata config
export interface SocialImagesGenerationConfig {
	defaults: DefaultOptions;
	types: {
		og: JobOptions;
		twitter: JobOptions;
	};
}

// Social image metadata added to the pageContext of pages when they are created
export interface SocialImagesMetadataProp {
	socialImagesMetadata: {
		og: JobOptions;
		twitter: JobOptions;
	};
}

// Open Graph image metadata added to the pageContext of gatsby-plugin-component-to-image components when they are created
export interface ImageMetadataProp {
	imageMetadata: JobOptions;
}

// Theme names
export enum ThemeType {
	Light = 'light',
	Dark = 'dark',
}

// Theme object used to style the site
export type Theme = Partial<{
	primary: string;
	'primary-content': string;
	secondary: string;
	'secondary-content': string;
	accent: string;
	'accent-content': string;
	neutral: string;
	'neutral-content': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
	'base-content': string;
	info: string;
	'info-content': string;
	success: string;
	'success-content': string;
	warning: string;
	'warning-content': string;
	error: string;
	'error-content': string;
}>;

// Raw themes config used to generate theme objects
export interface ThemesConfig {
	[ThemeType.Light]: Theme;
	[ThemeType.Dark]: Theme;
}

// Color mappings for project and role types
export interface ColorMappings {
	[type: string]: BgColorString;
}

// Raw color mappings config used to generate color mappings
export interface ColorMappingsConfig {
	default: BgColorString;
	projectType: ColorMappings;
	roleType: ColorMappings;
}

export interface PageSection {
	title: string;
	ref: RefObject<HTMLElement>;
}

export interface Link {
	to: string;
	isInternal?: boolean;
	rel?: string;
}

export enum TooltipPosition {
	Left = 0,
	Right = 1,
	Top = 2,
	Bottom = 3,
}

export interface Button extends PropsWithClassName, PropsWithLayoutAnimations {
	iconClassName?: string;
	textClassName?: string;
	tooltipClassName?: string;
	type?: React.ButtonHTMLAttributes<any>['type'];
	icon?: IconDefinition;
	text?: string | number;
	tooltipText?: string;
	tooltipPosition?: TooltipPosition;
	disabled?: boolean;
	responsive?: boolean;
	flip?: boolean;
}

export type ButtonElementRenderFunction = ({
	className,
	tooltipPosition,
}: {
	className: string;
	tooltipPosition: TooltipPosition;
}) => React.JSX.Element;

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

export type InputElementRenderFunction = (
	props: UseFormRegisterReturn<string>,
) => React.JSX.Element;

export interface Input extends PropsWithClassName, PropsWithLayoutAnimations {
	labelClassName?: string;
	inputClassName?: string;
	name: string;
	label?: string;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validationOptions?: InputValidationOptions;
}

export enum AlertType {
	Info = 0,
	Success = 1,
	Warning = 2,
	Error = 3,
}

type EmploymentRoleTypes = 'internship' | 'summer job';

// Raw role config
export type RoleConfig = {
	type?: string;
	title: Capitalize<string>;
	company: Capitalize<string>;
	startDate: DateString;
	endDate: DateString;
	location: CityAndStateString;
	bullets: SentenceString[];
};

// Role object used to represent jobs and volunteer positions
export type Role = Overwrite<
	RoleConfig,
	{
		startDate: Date;
		endDate: Date;
	}
>;

export type EmploymentRoleConfig = Overwrite<
	RoleConfig,
	{
		type?: EmploymentRoleTypes;
	}
>;

export type EmploymentRole = Overwrite<
	Role,
	{
		type?: EmploymentRoleTypes;
	}
>;

export type GithubRepoRules = {
	hide?: boolean;
	pin?: boolean;
};

export type GithubReposConfig = {
	defaults: GithubRepoRules & {
		limit: number;
	};
	slugs: {
		[repoSlug: string]: GithubRepoRules;
	};
};

// Raw response from the GitHub GraphQL query
export type GithubReposQueryResponse = {
	errors?: unknown[];
	data?: Queries.GithubReposQuery;
};

// Raw, non-null repo object response from GitHub
export type GithubRepoQuery = NonNullable<
	NonNullable<
		NonNullable<
			NonNullable<
				NonNullable<Queries.GithubReposQuery['githubData']>['data']
			>['user']
		>['repositories']
	>['nodes']
>[number] extends infer R
	? R extends { readonly name: unknown }
		? R
		: never
	: never;

// Transformed repo object with additional properties
export type GithubRepo = Pick<
	GithubRepoQuery,
	| 'forkCount'
	| 'url'
	| 'homepageUrl'
	| 'licenseInfo'
	| 'openGraphImageUrl'
	| 'stargazerCount'
	| 'usesCustomOpenGraphImage'
> & {
	description: string | null;
	languages: string[];
	logoUrl: string | null;
	name: string;
	owner: string;
	readmeText: string | null;
	shortDescription: string | null;
	slug: string;
	topics: string[];
	type: {
		color: string;
		name: string | null;
	};
	updatedAt: Date | null;
};

export type ToggleContext = Context<{
	isEnabled: boolean;
	toggle: () => void;
}>;
