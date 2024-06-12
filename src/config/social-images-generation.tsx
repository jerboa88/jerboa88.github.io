/*
	Social images generation configuration
	--------------------------------------
*/


import type { SocialImagesGenerationConfig } from '../common/types';


export default {
	defaults: {
		type: 'webp',
		quality: 100,
		verbose: false,
	},
	types: {
		og: {
			size: {
				width: 1200,
				height: 630,
			},
		},
		twitter: {
			size: {
				width: 1200,
				height: 600,
			},
		},
	}
} as SocialImagesGenerationConfig;
