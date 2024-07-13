/*
	Helper methods for managing config server-side
	----------------------------------------------
*/

import type { JobOptions } from 'gatsby-plugin-component-to-image/lib/types';
import type {
	BgColorString,
	EmploymentRole,
	GithubRepoRules,
	GithubReposConfig,
	PageMetadata,
	Role,
	SentenceString,
	SocialImageTypes,
	SocialImagesGenerationConfig,
	Theme,
	ThemesConfig,
	UrlString,
} from '../common/types';
import { colorMappingsConfig } from '../config/color-mappings';
import { externalServicesConfig } from '../config/external-services';
import { githubReposConfig } from '../config/github-repos';
import { pagesMetadataConfig } from '../config/metadata/pages';
import { siteMetadataConfig } from '../config/metadata/site';
import { educationRolesConfig } from '../config/roles/education';
import { employmentRolesConfig } from '../config/roles/employment';
import { volunteeringRolesConfig } from '../config/roles/volunteering';
import { socialImagesGenerationConfig } from '../config/social-images-generation';
import { themesConfig } from '../config/themes';
import { isDefined } from './utilities';

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
			first: Capitalize<string>;
			last: Capitalize<string>;
			initial: Capitalize<string>;
			short: Capitalize<string>;
			full: Capitalize<string>;
		};
		jobTitle: Capitalize<string>;
		alumniOf: Capitalize<string>;
		imageUrl: UrlString;
		username: {
			github: string;
			twitter: string;
		};
		url: {
			linkedin: UrlString;
			github: UrlString;
			twitter: UrlString;
		};
		location: {
			city: Capitalize<string>;
			state: Capitalize<string>;
			country: Capitalize<string>;
		};
	};
};

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
				first: config.author.name.first,
				last: config.author.name.last,
				initial: config.author.name.first[0] as typeof config.author.name.first,
				short:
					`${config.author.name.first} ${config.author.name.last[0]}` as typeof config.author.name.first,
				full: authorFullName,
			},
			jobTitle: config.author.jobTitle,
			alumniOf: config.author.alumniOf,
			imageUrl: config.author.imageUrl,
			username: {
				github: config.author.username.github,
				twitter: config.author.username.twitter,
			},
			url: {
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

// Returns a list of rules for a given GitHub repo slug
export function getGithubRepoRulesForSlug(
	slug: string,
): Required<GithubRepoRules> {
	const rules = githubReposConfig.slugs[slug];

	return {
		hide: githubReposConfig.defaults.hide ?? false,
		pin: githubReposConfig.defaults.pin ?? false,
		...rules,
	};
}

export function getGithubRepoRulesDefaults(): GithubReposConfig['defaults'] {
	return githubReposConfig.defaults;
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
