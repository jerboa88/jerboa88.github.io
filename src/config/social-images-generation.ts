/*
	Social images generation configuration
	--------------------------------------
*/

import {
	SocialImageType,
	type SocialImagesGenerationConfig,
} from '../types/other.ts';

export const socialImagesGenerationConfig: SocialImagesGenerationConfig = {
	defaults: {
		type: 'webp',
		quality: 100,
		verbose: false,
	},
	types: {
		[SocialImageType.OpenGraph]: {
			size: {
				width: 2400,
				height: 1260,
			},
		},
		[SocialImageType.X]: {
			size: {
				width: 2400,
				height: 1200,
			},
		},
	},
};
