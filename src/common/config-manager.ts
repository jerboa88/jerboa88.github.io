/*
	Helper methods for managing config server-side
	----------------------------------------------
*/


import type { BgColor, PageMetadata, ProjectTypeColorMappingsInterface, RoleInterface, RoleTypeColorMappingsInterface, SiteMetadataInterface, SocialImageTypes, SocialImagesGenerationConfig, ThemeInterface } from '../common/types';
import siteMetadataConfig from '../config/site-metadata';
import pageMetadataConfig from '../config/pages-metadata';
import socialImagesGenerationConfig from '../config/social-images-generation';
import externalServicesConfig from '../config/external-services';
import jobsConfig from '../config/jobs';
import themesConfig from '../config/themes';
import colorMappingsConfig from '../config/color-mappings';
import { JobOptions } from 'gatsby-plugin-component-to-image/lib/types';


// Class for loading and formatting configuration data
export default class ConfigManager {
	getSiteMetadata(): SiteMetadataInterface {
		const smc = siteMetadataConfig;
		const authorFullName = `${smc.author.name.first} ${smc.author.name.last}`;

		return {
			shortTitle: authorFullName,
			title: `${authorFullName} | ${smc.author.jobTitle}`,
			tagline: `${smc.author.jobTitle} & Cat Whisperer`,
			shortDescription: `Portfolio site for ${authorFullName}`,
			description: `Portfolio site for ${authorFullName}, a ${smc.author.jobTitle} based in ${smc.author.location.city}, ${smc.author.location.state}.`,
			iconPath: smc.iconPath,
			siteUrl: smc.siteUrl,
			sourceUrl: smc.sourceUrl,
			author: {
				name: {
					first: smc.author.name.first,
					last: smc.author.name.last,
					initial: smc.author.name.first[0],
					short: `${smc.author.name.first} ${smc.author.name.last[0]}`,
					full: authorFullName,
				},
				jobTitle: smc.author.jobTitle,
				alumniOf: smc.author.alumniOf,
				image: smc.author.image,
				username: {
					twitter: smc.author.username.twitter,
				},
				link: {
					linkedin: `https://www.linkedin.com/in/${smc.author.username.linkedin}`,
					github: `https://github.com/${smc.author.username.github}`,
					twitter: `https://twitter.com/${smc.author.username.twitter}`,
				},
				location: {
					city: smc.author.location.city,
					state: smc.author.location.state,
					country: smc.author.location.country,
				},
			}
		};
	}

	// Returns the metadata for a given page
	getPageMetadata(pagePath: string): PageMetadata {
		const pmc = pageMetadataConfig[pagePath as keyof typeof pageMetadataConfig];

		if (!pmc) {
			console.warn(`Page metadata for ${pagePath} not found`);
		}

		return pmc;
	}

	// Returns the social image generation config for a given type
	getSocialImageGenerationConfigDefaults(): SocialImagesGenerationConfig['defaults'] {
		return socialImagesGenerationConfig.defaults;
	}

	// Returns the social image generation config for a given type
	getSocialImageGenerationConfigForType(type: SocialImageTypes): JobOptions {
		const sigc = socialImagesGenerationConfig.types[type as keyof typeof socialImagesGenerationConfig['types']];

		if (!sigc) {
			console.warn(`Social image generation config for '${type}' not found`);
		}

		return sigc;
	}

	getExternalServices() {
		return externalServicesConfig;
	}

	// Returns a list of jobs with formatted date objects
	getJobs(): RoleInterface[] {
		return jobsConfig.map(job => ({
			...job,
			startDate: new Date(job.startDate),
			endDate: new Date(job.endDate),
		}));
	}

	// Returns a daisyUI theme given its name
	getTheme(themeName: 'light' | 'dark'): ThemeInterface {
		const theme = themesConfig[themeName];

		if (!theme) {
			throw new Error(`Theme '${themeName}' not found`);
		}

		return theme;
	}

	// Returns the color for a given project type
	getProjectTypeColor(projectType: string): BgColor | '' {
		const colorMap = colorMappingsConfig.projectType;

		projectType = projectType.toLowerCase();

		return projectType in colorMap ? colorMap[projectType as keyof ProjectTypeColorMappingsInterface] : '';
	}

	// Returns the color for a given role type
	getRoleTypeColor(roleType: string): BgColor | '' {
		const colorMap = colorMappingsConfig.roleType;

		roleType = roleType.toLowerCase();

		return roleType in colorMap ? colorMap[roleType as keyof RoleTypeColorMappingsInterface] : '';
	}
};
