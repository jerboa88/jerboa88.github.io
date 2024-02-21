/*
	Helper methods for managing config server-side
	----------------------------------------------
*/


import siteMetadataConfig from '../config/site-metadata';
import themesConfig from '../config/themes';
import iconGenerationConfig from '../config/icon-generation';


// Exports

// Class for loading and formatting configuration data
export default class ConfigManager {
	// TODO: Rename this method to getSiteMetadata
	// TODO: Build additional fields from the ones in the `siteMetadataConfig` object
	getMetadata() {
		return siteMetadataConfig;
	}

	// Return a a daisyUI theme given its name
	getTheme(themeName: 'light' | 'dark') {
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
