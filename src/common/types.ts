/*
	Reusable types for the project
	------------------------------
*/

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { LayoutProps } from 'framer-motion';
import type {
	DefaultOptions,
	JobOptions,
} from 'gatsby-plugin-component-to-image/lib/types';
import type { RefObject } from 'react';
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
export type SentenceString = Capitalize<`${string}${'.' | '!' | '?' | '…'}`>;

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
			first: Capitalize<string>;
			last: Capitalize<string>;
		};
		jobTitle: Capitalize<string>;
		alumniOf: Capitalize<string>;
		imageUrl: UrlString;
		username: {
			linkedin: string;
			github: string;
			twitter: string;
		};
		location: {
			city: Capitalize<string>;
			state: Capitalize<string>;
			country: Capitalize<string>;
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

// Variant names for social images
export enum SocialImageType {
	OpenGraph = 'og',
	Twitter = 'twitter',
}

// Raw social image metadata config
export interface SocialImagesGenerationConfig {
	defaults: Partial<DefaultOptions>;
	types: {
		[SocialImageType.OpenGraph]: Partial<JobOptions>;
		[SocialImageType.Twitter]: Partial<JobOptions>;
	};
}

// Social image metadata added to the pageContext of pages when they are created
export interface SocialImagesMetadataProp {
	socialImagesMetadata: {
		[SocialImageType.OpenGraph]: JobOptions;
		[SocialImageType.Twitter]: JobOptions;
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

// Visibility options for entries (e.g. projects, roles, etc.)
export enum EntryVisibility {
	Pin = 0,
	Show = 1,
	Hide = 2,
}

// Names of pages where entries can be displayed
export enum EntryPage {
	Index = 'index',
	Resume = 'resume',
}

type EmploymentRoleTypes = 'internship' | 'summer job';

// Raw role config
export type RoleConfig = {
	type?: string;
	title: Capitalize<string>;
	company: Capitalize<string>;
	companyUrl: UrlString;
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

/**
 * An enumeration of possible project categories
 *
 * @enum {number}
 */
export enum ProjectCategory {
	Other = 0,
	GithubRepo = 1,
}

/**
 * A visibility prop added to project configs
 */
type ProjectVisibilityProp = {
	visibility: {
		[EntryPage.Index]?: EntryVisibility;
		[EntryPage.Resume]?: EntryVisibility;
	};
};

/**
 * A base project with common fields
 *
 * @param createdAt - The date the project was created
 * @param description - A brief description of the project
 * @param exposition - A longer description of the project, if available. This is used as the project description on the resume page
 * @param languages - A list of programming languages used in the project
 * @param name - The name of the project
 * @param slug - The slug of the project
 * @param type.color - The color of the project type
 * @param type.name - The name of the project type (ex. "Website")
 * @param updatedAt - The date the project was last updated
 */
export type BaseProject = {
	createdAt: Date;
	description: string;
	exposition: string | null;
	languages: string[];
	name: string;
	slug: string;
	type: {
		color: string;
		name: string | null;
	};
	updatedAt: Date;
};

/**
 * A manually added project
 */
export type OtherProject = Overwrite<
	BaseProject,
	{
		description: SentenceString;
		exposition: SentenceString;
	}
> & {
	category: ProjectCategory.Other;
	stargazerCount?: number;
	url?: UrlString;
};

/**
 * A GitHub repo project
 */
export type GithubRepoProject = Queries.GithubRepo & {
	category: ProjectCategory.GithubRepo;
};

/**
 * Config for a GitHub repo project
 */
type GithubRepoProjectConfig = ProjectVisibilityProp &
	Pick<GithubRepoProject, 'category' | 'slug'> &
	Partial<Pick<GithubRepoProject, 'owner'>>;

/**
 * Config for a manually added project
 */
export type OtherProjectConfig = Partial<ProjectVisibilityProp> &
	Overwrite<
		OtherProject,
		{
			createdAt: DateString;
			description: SentenceString;
			exposition: SentenceString;
			type: string;
			updatedAt: DateString;
		}
	>;

/**
 * Union of all project config types
 */
export type ProjectConfig = GithubRepoProjectConfig | OtherProjectConfig;

/**
 * Config for all projects
 */
export type ProjectsConfig = {
	maxForPage: {
		[EntryPage.Index]: number;
		[EntryPage.Resume]: number;
	};
	projects: ProjectConfig[];
};

/**
 * Union of all project types
 */
export type Project = GithubRepoProject | OtherProject;

/**
 * Base page context type that can be extended with additional properties. Page metadata is automatically added to pages of this type
 *
 * @typeParam T - Additional context properties
 */
type PageContext<T extends object = EmptyObject> = PageMetadataProp & T;

/**
 * Base page context type for social images pages that can be extended with additional properties. Image metadata is automatically added to pages of this type by gatsby-plugin-component-to-image
 *
 * @typeParam T - Additional context properties
 */
type SocialImagePageContext<T extends object = EmptyObject> =
	ImageMetadataProp & T;

/**
 * Page context to add to the index page
 */
export type IndexPageContext = {
	projects: Project[];
	authorBioHtml: string;
};

/**
 * Page context to add to project pages
 */
export type ProjectPageContext = {
	project: Project;
};

/**
 * Page context to add to the resume page
 */
export type ResumePageContext = PageContext<{
	projects: Project[];
}>;

/**
 * Page context for the cover letter page
 */
export type CoverLetterPageContext = PageContext;

/**
 * Page context for the privacy policy page
 */
export type PrivacyPageContext = PageContext;

/**
 * Page context for the 404 page
 */
export type NotFoundPageContext = PageContext;

/**
 * Page context for the index social image page
 */
export type IndexSocialImagePageContext =
	SocialImagePageContext<IndexPageContext>;

/**
 * Page context for other social image pages
 */
export type OtherSocialImagePageContext =
	SocialImagePageContext<PageMetadataProp>;

/**
 * Page context for project social image pages
 */
export type ProjectSocialImagePageContext =
	SocialImagePageContext<ProjectPageContext>;
