/*
	Metadata for individual pages
	-----------------------------
*/

import type { PagesMetadataConfig } from '../../common/types';

export const pagesMetadataConfig: PagesMetadataConfig = {
	'/privacy-policy': {
		title: 'Privacy Policy',
		shortTitle: 'Privacy',
		description:
			'This privacy notice describes how and why johng.io might collect, store, use, and/or share your information.',
	},
	'/resume': {
		title: 'Resume',
		shortTitle: 'Resume',
		description:
			'Resume for John Goodliff, a software developer based in Edmonton, Alberta.',
	},
	'/404': {
		title: '404 - Page Not Found',
		shortTitle: '404',
		description: "Oof, there's nothing here.",
	},
};
