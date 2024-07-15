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
		'BiglyBT-plugin-autostop': EntryVisibility.Hide,
		calculator: EntryVisibility.Hide,
		'catppuccin-nvim': EntryVisibility.Hide,
		'Custom-PiHole-Interface': EntryVisibility.Hide,
		formie: EntryVisibility.Hide,
		'Game-Maps': EntryVisibility.HideFromResume,
		'gimp-average-layers': EntryVisibility.HideFromResume,
		hackathon: EntryVisibility.Hide,
		'Image-Signer': EntryVisibility.Hide,
		jerboa88: EntryVisibility.Hide,
		'jerboa88.github.io': EntryVisibility.Hide,
		'Make-me-laugh': EntryVisibility.Hide,
		'rtg-for-outlook': EntryVisibility.Hide,
		tinyi18n: EntryVisibility.HideFromResume,
		ScheduleStorm: EntryVisibility.Hide,
	},
};
