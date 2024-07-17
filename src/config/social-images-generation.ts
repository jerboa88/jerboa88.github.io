/*
	Social images generation configuration
	--------------------------------------
*/

import {
	SocialImageType,
	type SocialImagesGenerationConfig,
} from '../common/types';

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
		[SocialImageType.Twitter]: {
			size: {
				width: 2400,
				height: 1200,
			},
		},
	},
};
