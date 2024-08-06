/**
 * Assorted type definitions
 */

import type {
	DefaultOptions,
	JobOptions,
} from 'gatsby-plugin-component-to-image/lib/types';
import type { AbsolutePathString, BgColorString, UrlString } from './strings';

/**
 * Config object used to define external services
 */
export interface ExternalServicesConfig {
	botpoisonPublicKey: `pk_${string}`;
	contactFormPostUrl: UrlString;
}

/**
 * Config object used to define site metadata
 */
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

/**
 * Metadata for a single page
 */
export interface PageMetadata {
	title: string;
	shortTitle: string;
	description: string;
}

/**
 * Page metadata added to the pageContext of pages when they are created
 */
export interface PageMetadataProp {
	pageMetadata: PageMetadata;
}

/**
 * Config object used to define page metadata
 */
export interface PagesMetadataConfig {
	[pagePath: AbsolutePathString]: PageMetadata;
}

/**
 * An enumeration of possible social image types
 */
export enum SocialImageType {
	OpenGraph = 'og',
	Twitter = 'twitter',
}

/**
 * Config object used to define settings for generating social images
 */
export interface SocialImagesGenerationConfig {
	defaults: Partial<DefaultOptions>;
	types: {
		[SocialImageType.OpenGraph]: Partial<JobOptions>;
		[SocialImageType.Twitter]: Partial<JobOptions>;
	};
}

/**
 * Social image metadata added to the pageContext of pages when they are created
 */
export interface SocialImagesMetadataProp {
	socialImagesMetadata: {
		[SocialImageType.OpenGraph]: JobOptions;
		[SocialImageType.Twitter]: JobOptions;
	};
}

/**
 * Image metadata added to the pageContext of {@link https://github.com/jerboa88/gatsby-plugin-component-to-image | gatsby-plugin-component-to-image} components when they are created
 */
export interface ImageMetadataProp {
	imageMetadata: JobOptions;
}

/**
 * An enumeration of possible theme types
 */
export enum ThemeType {
	Light = 'light',
	Dark = 'dark',
}

/**
 * Colors for a single theme
 */
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

/**
 * Config object used to define themes
 */
export interface ThemesConfig {
	[ThemeType.Light]: Theme;
	[ThemeType.Dark]: Theme;
}

/**
 * Color mappings for project and role types
 */
interface ColorMappings {
	[type: string]: BgColorString;
}

/**
 * Config object used to define color mappings
 */
export interface ColorMappingsConfig {
	default: BgColorString;
	projectType: ColorMappings;
	roleType: ColorMappings;
}

/**
 * An enumeration of possible visibility states for entries
 */
export enum EntryVisibility {
	Pin = 0,
	Show = 1,
	Hide = 2,
}

/**
 * An enumeration of possible page types where entries can be displayed
 */
export enum EntryPage {
	Index = 'index',
	Resume = 'resume',
}
