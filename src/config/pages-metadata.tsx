/*
	Metadata for individual pages
	-----------------------------
*/

import type { PagesMetadataConfig } from '../common/types';

export const pagesMetadataConfig = {
	'/privacy-policy/': {
		title: 'Privacy Policy',
		shortTitle: 'Privacy',
		description:
			'This privacy notice describes how and why johng.io might collect, store, use, and/or share your information',
	},
	'/404/': {
		title: '404 - Page Not Found',
		shortTitle: '404',
		description: "Oof, there's nothing here",
	},
} as PagesMetadataConfig;
