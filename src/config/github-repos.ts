/*
	Custom rules for GitHub repos showcased on the site
	---------------------------------------------------
*/

import { EntryVisibility, type GithubReposConfig } from '../common/types';

export const githubReposConfig: GithubReposConfig = {
	defaults: {
		visibility: EntryVisibility.Show,
		limit: {
			index: 10,
			resume: 4,
		},
	},
	slugs: {
		'BiglyBT-plugin-autostop': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		calculator: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'catppuccin-nvim': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'Custom-PiHole-Interface': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		formie: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'Game-Maps': {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
		'gimp-average-layers': {
			visibilityForPage: {
				resume: EntryVisibility.Hide,
			},
		},
		hackathon: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'Image-Signer': {
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
		'jerboa88.github.io': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		'Make-me-laugh': {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
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
		ScheduleStorm: {
			visibilityForPage: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
	},
};
