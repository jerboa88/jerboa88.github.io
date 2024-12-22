/*
	Helper methods for managing config server-side
	----------------------------------------------
*/

import type { JobOptions } from 'gatsby-plugin-component-to-image/lib/types';
import { colorMappingsConfig } from '../config/color-mappings.ts';
import { PAGES_CONTENT_CONFIG } from '../config/content/pages.ts';
import { externalServicesConfig } from '../config/external-services.ts';
import { pagesMetadataConfig } from '../config/metadata/pages.ts';
import { siteMetadataConfig } from '../config/metadata/site.ts';
import { socialImagesGenerationConfig } from '../config/social-images-generation.ts';
import { themesConfig } from '../config/themes.ts';
import type { PageContentConfig } from '../types/content/content.ts';
import type {
	PageMetadata,
	SocialImageType,
	SocialImagesGenerationConfig,
	Theme,
	ThemesConfig,
} from '../types/other.ts';
import type {
	BgColorString,
	SentenceString,
	UrlString,
} from '../types/strings.ts';
import { isDefined } from '../utils/other.ts';

// Types

// Site metadata object used to populate the site's metadata
type SiteMetadata = {
	shortTitle: Capitalize<string>;
	title: Capitalize<string>;
	tagline: Capitalize<string>;
	shortDescription: SentenceString;
	description: SentenceString;
	iconPath: string;
	siteUrl: UrlString;
	sourceUrl: UrlString;
	author: {
		name: {
			full: Capitalize<string>;
		};
		jobTitle: Capitalize<string>;
		alumniOf: Capitalize<string>;
		imageUrl: UrlString;
		phone: string | undefined;
		email: string | undefined;
		username: {
			github: string;
			x: string;
		};
		url: {
			linkedin: UrlString;
			github: UrlString;
			x: UrlString;
		};
		location: {
			city: Capitalize<string>;
			state: Capitalize<string>;
			country: Capitalize<string>;
		};
	};
};

// Functions

// Returns metadata for the site
export function getSiteMetadata(): SiteMetadata {
	const config = siteMetadataConfig;
	const authorFullName: Capitalize<string> =
		`${config.author.name.first} ${config.author.name.last}` as typeof config.author.name.first;

	return {
		shortTitle: authorFullName,
		title:
			`${authorFullName} | ${config.author.jobTitle}` as typeof authorFullName,
		tagline:
			`${config.author.jobTitle} & Cat Whisperer` as typeof config.author.jobTitle,
		shortDescription: `Portfolio site for ${authorFullName}.` as SentenceString,
		description:
			`Portfolio site for ${authorFullName}, a ${config.author.jobTitle.toLowerCase()} based in ${config.author.location.city}, ${config.author.location.state}.` as SentenceString,
		iconPath: config.iconPath,
		siteUrl: config.siteUrl,
		sourceUrl: config.sourceUrl,
		author: {
			name: {
				full: authorFullName,
			},
			jobTitle: config.author.jobTitle,
			alumniOf: config.author.alumniOf,
			imageUrl: config.author.imageUrl,
			phone: process.env.AUTHOR_PHONE,
			email: process.env.AUTHOR_EMAIL,
			username: {
				github: config.author.username.github,
				x: config.author.username.x,
			},
			url: {
				linkedin: `https://linkedin.com/in/${config.author.username.linkedin}`,
				github: `https://github.com/${config.author.username.github}`,
				x: `https://x.com/${config.author.username.x}`,
			},
			location: {
				city: config.author.location.city,
				state: config.author.location.state,
				country: config.author.location.country,
			},
		},
	};
}

// Returns the metadata for a given page
export function getPageMetadata(pagePath: string): PageMetadata {
	const config =
		pagesMetadataConfig[pagePath as keyof typeof pagesMetadataConfig];

	if (!config) {
		console.warn(`Page metadata for ${pagePath} not found`);
	}

	return config;
}

// Returns the content config for a given page
export function getPageContentConfig(pagePath: string): PageContentConfig {
	const config =
		PAGES_CONTENT_CONFIG[pagePath as keyof typeof PAGES_CONTENT_CONFIG];

	if (!config) {
		console.warn(`Page content config for ${pagePath} not found`);
	}

	return config;
}

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigDefaults(): SocialImagesGenerationConfig['defaults'] {
	return socialImagesGenerationConfig.defaults;
}

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigForType(
	type: SocialImageType,
): Partial<JobOptions> {
	const config = socialImagesGenerationConfig.types[type];

	if (!config) {
		console.warn(`Social image generation config for '${type}' not found`);
	}

	return config;
}

export function getExternalServices() {
	return externalServicesConfig;
}

// Returns a daisyUI theme given its name
export function getTheme(themeName: keyof ThemesConfig): Theme {
	const config = themesConfig[themeName];

	if (!config) {
		throw new Error(`Theme '${themeName}' not found`);
	}

	return config;
}

// Returns the color for a given project type
export function getProjectTypeColor(
	projectType: string | undefined | null,
): BgColorString | '' {
	const colorMap = colorMappingsConfig.projectType;
	const key = projectType?.toLowerCase();

	if (isDefined(key)) {
		if (key in colorMap) {
			return colorMap[key as keyof typeof colorMap];
		}

		console.warn(`Color for project type '${projectType}' not found`);
	}

	return colorMappingsConfig.default;
}

// Returns the color for a given role type
export function getRoleTypeColor(
	roleType: string | undefined | null,
): BgColorString | '' {
	const colorMap = colorMappingsConfig.roleType;
	const key = roleType?.toLowerCase();

	if (isDefined(key)) {
		if (key in colorMap) {
			return colorMap[key as keyof typeof colorMap];
		}

		console.warn(`Color for role type '${roleType}' not found`);
	}

	return colorMappingsConfig.default;
}
