/*
	Helper methods for managing config server-side
	----------------------------------------------
*/


import type { BgColor, ProjectTypeColorMappingsInterface, RoleInterface, RoleTypeColorMappingsInterface, SiteMetadataInterface, ThemeInterface } from '../common/types';
import siteMetadataConfig from '../config/site-metadata';
import jobsConfig from '../config/jobs';
import themesConfig from '../config/themes';
import colorMappingsConfig from '../config/color-mappings';
import iconGenerationConfig from '../config/icon-generation';


// Exports

// Class for loading and formatting configuration data
export default class ConfigManager {
	// TODO: Rename this method to getSiteMetadata
	getMetadata(): SiteMetadataInterface {
		return {
			shortTitle: siteMetadataConfig.author.name,
			title: `${siteMetadataConfig.author.name} | ${siteMetadataConfig.author.jobTitle}`,
			tagline: `${siteMetadataConfig.author.jobTitle} & Cat Whisperer`,
			shortDescription: `Portfolio site for ${siteMetadataConfig.author.name}`,
			description: `Portfolio site for ${siteMetadataConfig.author.name}, a ${siteMetadataConfig.author.jobTitle} based in ${siteMetadataConfig.author.location.city}, ${siteMetadataConfig.author.location.state}.`,
			ogImagePath: siteMetadataConfig.ogImagePath,
			ogImageAltText: siteMetadataConfig.ogImageAltText,
			siteUrl: siteMetadataConfig.siteUrl,
			sourceUrl: siteMetadataConfig.sourceUrl,
			trackingId: siteMetadataConfig.trackingId,
			author: {
				name: siteMetadataConfig.author.name,
				jobTitle: siteMetadataConfig.author.jobTitle,
				alumniOf: siteMetadataConfig.author.alumniOf,
				image: siteMetadataConfig.author.image,
				username: {
					twitter: siteMetadataConfig.author.username.twitter,
				},
				link: {
					linkedin: `https://www.linkedin.com/in/${siteMetadataConfig.author.username.linkedin}`,
					github: `https://github.com/${siteMetadataConfig.author.username.github}`,
					twitter: `https://twitter.com/${siteMetadataConfig.author.username.twitter}`,
				},
				location: {
					city: siteMetadataConfig.author.location.city,
					state: siteMetadataConfig.author.location.state,
					country: siteMetadataConfig.author.location.country,
				},
			}
		}
	}

	// Returns a list of jobs with formatted date objects
	getJobs(): RoleInterface[] {
		return jobsConfig.map(job => {
			return {
				...job,
				startDate: new Date(job.startDate),
				endDate: new Date(job.endDate),
			};
		});
	}

	// Returns a daisyUI theme given its name
	getTheme(themeName: 'light' | 'dark'): ThemeInterface {
		const theme = themesConfig[themeName];

		if (!theme) {
			throw new Error(`Theme ${themeName} not found`);
		}

		const bgColor = theme['base-100'];

		return {
			...theme,
			// Custom vars for header colors
			'--ph': theme['primary-header'],
			'--sh': theme['secondary-header'],
			'primary-content': bgColor,
			'secondary-content': bgColor,
			'accent-content': bgColor,
			'info-content': bgColor,
			'success-content': bgColor,
			'warning-content': bgColor,
			'error-content': bgColor,
		};
	}

	// Returns the color for a given project type
	getProjectTypeColor(projectType: string): BgColor | false {
		const colorMap = colorMappingsConfig.projectType;

		projectType = projectType.toLowerCase();

		return projectType in colorMap && colorMap[projectType as keyof ProjectTypeColorMappingsInterface];
	}

	// Returns the color for a given role type
	getRoleTypeColor(roleType: string): BgColor | false {
		const colorMap = colorMappingsConfig.roleType;

		roleType = roleType.toLowerCase();

		return roleType in colorMap && colorMap[roleType as keyof RoleTypeColorMappingsInterface];
	}


	// Returns the OpenGraph image generation config
	getOgImage() {
		return iconGenerationConfig.ogImage;
	}

	// Returns the icon generation config
	getIcons() {
		return iconGenerationConfig.icons;
	}

	// Generate icon entries for the site's webmanifest using the provided icon generation config
	getIconManifestEntries() {
		// Flatten after mapping as we do not need to keep any info about how the icons are generated
		return iconGenerationConfig.icons.flatMap(inputRule => {
			return inputRule.to.map(outputRule => {
				return {
					src: outputRule.path,
					sizes: `${outputRule.size}x${outputRule.size}`,
					type: this.getMimeTypeFromPath(outputRule.path),
					// If the icon name contains `maskable`, set the purpose property to `maskable`
					purpose: outputRule.path.match(/maskable/) ? 'maskable' : 'any'
				};
			});
		});
	}

	// Returns the mime type for the provided image path
	getMimeTypeFromPath(path: string) {
		if (path.endsWith('.svg')) {
			return 'image/svg+xml';
		} else {
			const match = path.match(/\.(jpg|jpeg|png|webp|gif|avif|tif|tiff)$/i);

			if (!match || match.length < 2) {
				throw new Error(`Could not determine mime type for image path ${path}`);
			}

			return `image/${match[1]}`;
		}
	}
};
