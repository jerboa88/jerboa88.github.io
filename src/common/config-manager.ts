/*
	Helper methods for managing config server-side
	----------------------------------------------
*/

import type { JobOptions } from 'gatsby-plugin-component-to-image/lib/types';
import type {
	BgColor,
	PageMetadata,
	Role,
	SocialImageTypes,
	SocialImagesGenerationConfig,
	Theme,
	ThemesConfig,
	Url,
} from '../common/types';
import { colorMappingsConfig } from '../config/color-mappings';
import { externalServicesConfig } from '../config/external-services';
import { pagesMetadataConfig } from '../config/pages-metadata';
import { rolesConfig } from '../config/roles';
import { siteMetadataConfig } from '../config/site-metadata';
import { socialImagesGenerationConfig } from '../config/social-images-generation';
import { themesConfig } from '../config/themes';
import { getOrDefault } from './utilities';

// Types

// Site metadata object used to populate the site's metadata
type SiteMetadata = {
	shortTitle: string;
	title: string;
	tagline: string;
	shortDescription: string;
	description: string;
	iconPath: string;
	siteUrl: Url;
	sourceUrl: Url;
	author: {
		name: {
			first: string;
			last: string;
			initial: string;
			short: string;
			full: string;
		};
		jobTitle: string;
		alumniOf: string;
		image: string;
		username: {
			twitter: string;
		};
		link: {
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
};

// Returns metadata for the site
export function getSiteMetadata(): SiteMetadata {
	const config = siteMetadataConfig;
	const authorFullName = `${config.author.name.first} ${config.author.name.last}`;

	return {
		shortTitle: authorFullName,
		title: `${authorFullName} | ${config.author.jobTitle}`,
		tagline: `${config.author.jobTitle} & Cat Whisperer`,
		shortDescription: `Portfolio site for ${authorFullName}`,
		description: `Portfolio site for ${authorFullName}, a ${config.author.jobTitle.toLowerCase()} based in ${config.author.location.city}, ${config.author.location.state}.`,
		iconPath: config.iconPath,
		siteUrl: config.siteUrl,
		sourceUrl: config.sourceUrl,
		author: {
			name: {
				first: config.author.name.first,
				last: config.author.name.last,
				initial: config.author.name.first[0],
				short: `${config.author.name.first} ${config.author.name.last[0]}`,
				full: authorFullName,
			},
			jobTitle: config.author.jobTitle,
			alumniOf: config.author.alumniOf,
			image: config.author.image,
			username: {
				twitter: config.author.username.twitter,
			},
			link: {
				linkedin: `https://www.linkedin.com/in/${config.author.username.linkedin}`,
				github: `https://github.com/${config.author.username.github}`,
				twitter: `https://twitter.com/${config.author.username.twitter}`,
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

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigDefaults(): SocialImagesGenerationConfig['defaults'] {
	return socialImagesGenerationConfig.defaults;
}

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigForType(
	type: SocialImageTypes,
): JobOptions {
	const config =
		socialImagesGenerationConfig.types[
			type as keyof (typeof socialImagesGenerationConfig)['types']
		];

	if (!config) {
		console.warn(`Social image generation config for '${type}' not found`);
	}

	return config;
}

export function getExternalServices() {
	return externalServicesConfig;
}

// Returns a list of roles with formatted date objects
export function getRoles(): Role[] {
	return rolesConfig.map((role) => ({
		...role,
		startDate: new Date(role.startDate),
		endDate: new Date(role.endDate),
	}));
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
export function getProjectTypeColor(projectType: string): BgColor | '' {
	const colorMap = colorMappingsConfig.projectType;
	const key = projectType.toLowerCase();

	return getOrDefault(colorMap, key, '');
}

// Returns the color for a given role type
export function getRoleTypeColor(roleType: string): BgColor | '' {
	const colorMap = colorMappingsConfig.roleType;
	const key = roleType.toLowerCase();

	return getOrDefault(colorMap, key, '');
}
