/*
	Social images generation configuration
	--------------------------------------
*/

import type { SocialImagesGenerationConfig } from '../common/types';

export const socialImagesGenerationConfig: SocialImagesGenerationConfig = {
	defaults: {
		type: 'webp',
		quality: 100,
		verbose: false,
	},
	types: {
		og: {
			size: {
				width: 2400,
				height: 1260,
			},
		},
		twitter: {
			size: {
				width: 2400,
				height: 1200,
			},
		},
	},
};
