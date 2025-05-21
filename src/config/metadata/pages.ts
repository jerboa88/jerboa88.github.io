/*
	Metadata for individual pages
	-----------------------------
*/

import type { PagesMetadataConfig } from '../../types/other.ts';
import {
	COVER_LETTER_PATH,
	FUNDING_PATH,
	NOT_FOUND_PATH,
	PRIVACY_POLICY_PATH,
	RESUME_PATH,
} from '../constants.ts';

export const PAGES_METADATA_CONFIG: PagesMetadataConfig = {
	[FUNDING_PATH]: {
		title: 'Funding',
		shortTitle: 'Funding',
		description: 'Ways to support my open-source work and other projects.',
	},
	[PRIVACY_POLICY_PATH]: {
		title: 'Privacy Policy',
		shortTitle: 'Privacy',
		description:
			'This privacy notice describes how and why johng.io might collect, store, use, and/or share your information.',
	},
	[RESUME_PATH]: {
		title: 'Resume',
		shortTitle: 'Resume',
		description:
			'Resume for John Goodliff, a software developer based in Edmonton, Alberta.',
	},
	[COVER_LETTER_PATH]: {
		title: 'Cover Letter',
		shortTitle: 'Cover Letter',
		description:
			'Cover letter for John Goodliff, a software developer based in Edmonton, Alberta.',
	},
	[NOT_FOUND_PATH]: {
		title: '404 - Page Not Found',
		shortTitle: '404',
		description: "Oof, there's nothing here.",
	},
} as const;
