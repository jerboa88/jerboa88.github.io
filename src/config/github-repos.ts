/*
	Custom rules for GitHub repos showcased on the site
	---------------------------------------------------
*/

import { EntryVisibility, type GithubReposConfig } from '../common/types';

export const githubReposConfig: GithubReposConfig = {
	maxForPage: {
		index: 10,
		resume: 4,
	},
	slugs: {
		168421: {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
		'compare-form-backends': {
			visibilityForPage: {
				index: EntryVisibility.Show,
			},
		},
		'custom-url-shortener': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		dotfiles: {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
		'game-maps': {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
		'gimp-average-layers': {
			visibilityForPage: {
				index: EntryVisibility.Show,
			},
		},
		hackathon: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'image-signer': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		jerboa88: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'jerboa88-github-io': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'make-me-laugh': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'on-my-way': {
			visibilityForPage: {
				index: EntryVisibility.Show,
				resume: EntryVisibility.Pin,
			},
		},
		'rtg-for-outlook': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		tinyi18n: {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
	},
};
