/*
	Helper methods for managing config server-side
	----------------------------------------------
*/

import type { JobOptions } from 'gatsby-plugin-component-to-image/lib/types';
import type {
	BgColorString,
	EmploymentRole,
	PageMetadata,
	Role,
	SocialImageTypes,
	SocialImagesGenerationConfig,
	Theme,
	ThemesConfig,
	UrlString,
} from '../common/types';
import { colorMappingsConfig } from '../config/color-mappings';
import { externalServicesConfig } from '../config/external-services';
import { pagesMetadataConfig } from '../config/metadata/pages';
import { siteMetadataConfig } from '../config/metadata/site';
import { educationRolesConfig } from '../config/roles/education';
import { employmentRolesConfig } from '../config/roles/employment';
import { volunteeringRolesConfig } from '../config/roles/volunteering';
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
	siteUrl: UrlString;
	sourceUrl: UrlString;
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
			github: string;
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
				github: config.author.username.github,
				twitter: config.author.username.twitter,
			},
			link: {
				linkedin: `https://linkedin.com/in/${config.author.username.linkedin}`,
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

// Returns a list of employment roles with formatted date objects
export function getEmploymentRoles(): EmploymentRole[] {
	return employmentRolesConfig
		.map((role) => ({
			...role,
			startDate: new Date(role.startDate),
			endDate: new Date(role.endDate),
		}))
		.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
}

// Returns a list of education roles with formatted date objects
export function getEducationRoles(): Role[] {
	return educationRolesConfig
		.map((role) => ({
			...role,
			startDate: new Date(role.startDate),
			endDate: new Date(role.endDate),
		}))
		.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
}

// Returns a list of volunteering roles with formatted date objects
export function getVolunteeringRoles(): Role[] {
	return volunteeringRolesConfig
		.map((role) => ({
			...role,
			startDate: new Date(role.startDate),
			endDate: new Date(role.endDate),
		}))
		.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
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
export function getProjectTypeColor(projectType: string): BgColorString | '' {
	const colorMap = colorMappingsConfig.projectType;
	const key = projectType?.toLowerCase();

	return getOrDefault(colorMap, key, '');
}

// Returns the color for a given role type
export function getRoleTypeColor(roleType: string): BgColorString | '' {
	const colorMap = colorMappingsConfig.roleType;
	const key = roleType?.toLowerCase();

	return getOrDefault(colorMap, key, '');
}
