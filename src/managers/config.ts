/*
	Helper methods for managing config server-side
	----------------------------------------------
*/

import { COLOR_MAPPINGS_CONFIG } from '../config/color-mappings.ts';
import { PAGES_CONTENT_CONFIG } from '../config/content/pages.ts';
import { PAGES_METADATA_CONFIG } from '../config/metadata/pages.ts';
import { SITE_METADATA_CONFIG } from '../config/metadata/site.ts';
import { SOCIAL_IMAGES_GENERATION_CONFIG } from '../config/social-images-generation.ts';
import { THEMES_CONFIG } from '../config/themes.ts';
import { warn } from '../node/logger.ts';
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
import type { Maybe, Nullable } from '../types/utils.ts';
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
		phone: Maybe<string>;
		email: Maybe<string>;
		username: {
			github: string;
			x: string;
		};
		url: {
			linkedin: UrlString;
			github: UrlString;
			x: UrlString;
			githubSponsors: UrlString;
			patreon: UrlString;
			braveCreators: UrlString;
		};
		location: {
			city: Capitalize<string>;
			state: Capitalize<string>;
			country: Capitalize<string>;
		};
	};
};

// Constants

const SITE_METADATA: SiteMetadata = (() => {
	const config = SITE_METADATA_CONFIG;
	const authorFullName: Capitalize<string> =
		`${config.author.name.first} ${config.author.name.last}` as typeof config.author.name.first;

	const authorPhone = process.env.AUTHOR_PHONE;
	const authorEmail = process.env.AUTHOR_EMAIL;

	if (!isDefined(authorPhone)) {
		warn(
			'Missing AUTHOR_PHONE environment variable. This info will not be included on the resume',
		);
	}

	if (!isDefined(authorEmail)) {
		warn(
			'Missing AUTHOR_EMAIL environment variable. This info will not be included on the resume',
		);
	}

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
			phone: authorPhone,
			email: authorEmail,
			username: {
				github: config.author.username.github,
				x: config.author.username.x,
			},
			url: {
				linkedin: `https://linkedin.com/in/${config.author.username.linkedin}`,
				github: `https://github.com/${config.author.username.github}`,
				x: `https://x.com/${config.author.username.x}`,
				githubSponsors: `https://github.com/sponsors/${config.author.username.github}`,
				patreon: `https://patreon.com/${config.author.username.patreon}`,
				braveCreators: `https://publishers.basicattentiontoken.org/en/c/${config.author.username.braveCreators}`,
			},
			location: {
				city: config.author.location.city,
				state: config.author.location.state,
				country: config.author.location.country,
			},
		},
	};
})();

// Functions

// Returns metadata for the site
export function getSiteMetadata() {
	return SITE_METADATA;
}

// Returns the metadata for a given page
export function getPageMetadata(pagePath: string): PageMetadata {
	const config =
		PAGES_METADATA_CONFIG[pagePath as keyof typeof PAGES_METADATA_CONFIG];

	if (!config) {
		warn(`Page metadata for ${pagePath} not found`);
	}

	return config;
}

// Returns the content config for a given page
export function getPageContentConfig(pagePath: string): PageContentConfig {
	const config =
		PAGES_CONTENT_CONFIG[pagePath as keyof typeof PAGES_CONTENT_CONFIG];

	if (!config) {
		warn(`Page content config for ${pagePath} not found`);
	}

	return config;
}

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigDefaults(): SocialImagesGenerationConfig['defaults'] {
	return SOCIAL_IMAGES_GENERATION_CONFIG.defaults;
}

// Returns the social image generation config for a given type
export function getSocialImageGenerationConfigForType(type: SocialImageType) {
	const config = SOCIAL_IMAGES_GENERATION_CONFIG.types[type];

	if (!config) {
		warn(`Social image generation config for '${type}' not found`);
	}

	return config;
}

// Returns a daisyUI theme given its name
export function getTheme(themeName: keyof ThemesConfig): Theme {
	const config = THEMES_CONFIG[themeName];

	if (!config) {
		throw new Error(`Theme '${themeName}' not found`);
	}

	return config;
}

// Returns the color for a given project category
export function getProjectCategoryColor(
	projectCategory: Maybe<Nullable<string>>,
): BgColorString | '' {
	const colorMap = COLOR_MAPPINGS_CONFIG.projectCategory;
	const key = projectCategory;

	if (isDefined(key)) {
		if (key in colorMap) {
			return colorMap[key as keyof typeof colorMap];
		}

		warn(`Color for project category '${projectCategory}' not found`);
	}

	return COLOR_MAPPINGS_CONFIG.default;
}

// Returns the color for a given role category
export function getRoleCategoryColor(
	roleCategory: Maybe<Nullable<string>>,
): BgColorString | '' {
	const colorMap = COLOR_MAPPINGS_CONFIG.roleCategory;
	const key = roleCategory;

	if (isDefined(key)) {
		if (key in colorMap) {
			return colorMap[key as keyof typeof colorMap];
		}

		warn(`Color for role category '${roleCategory}' not found`);
	}

	return COLOR_MAPPINGS_CONFIG.default;
}
