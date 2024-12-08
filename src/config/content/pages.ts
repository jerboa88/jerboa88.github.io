/*
	Content config for individual pages
	-----------------------------------
*/

import { RESUME_PATH } from '../../common/constants.ts';
import { INDEX_PATH } from '../../common/constants.ts';
import type { PagesContentConfig } from '../../types/content/content.ts';
import { ContentType, EntryVisibility } from '../../types/content/content.ts';
import { SkillType } from '../../types/content/skills.ts';

export const pagesContentConfig: PagesContentConfig = {
	[INDEX_PATH]: {
		[ContentType.Roles]: {
			employment: {
				limit: 2,
			},
			education: {
				limit: 0,
			},
			volunteering: {
				limit: 0,
			},
		},
		[ContentType.Skills]: {
			[SkillType.Languages]: {
				limit: 0,
			},
			[SkillType.Technologies]: {
				limit: 0,
			},
			[SkillType.Tools]: {
				limit: 0,
			},
			[SkillType.Topics]: {
				limit: 0,
			},
		},
		[ContentType.Projects]: {
			limit: 10,
			[EntryVisibility.Pin]: [],
			[EntryVisibility.Show]: [
				'compare-form-backends',
				'gimp-average-layers',
				'on-my-way',
			],
			[EntryVisibility.Hide]: [
				'CMPUT301W20T24-H03/on-my-way',
				'custom-url-shortener',
				'hackathon',
				'image-signer',
				'jerboa88-github-io',
				'jerboa88',
				'make-me-laugh',
				'pathfinder-v2',
				'rtg-for-outlook',
			],
		},
	},
	[RESUME_PATH]: {
		[ContentType.Roles]: {
			employment: {
				limit: 2,
			},
			education: {
				limit: 1,
			},
			volunteering: {
				limit: 0,
			},
		},
		[ContentType.Skills]: {
			[SkillType.Languages]: {
				limit: 10,
			},
			[SkillType.Technologies]: {
				limit: 10,
			},
			[SkillType.Tools]: {
				limit: 0,
			},
			[SkillType.Topics]: {
				limit: 0,
			},
		},
		[ContentType.Projects]: {
			limit: 3,
			[EntryVisibility.Pin]: ['on-my-way'],
			[EntryVisibility.Show]: [],
			[EntryVisibility.Hide]: [
				'168421',
				'CMPUT301W20T24-H03/on-my-way',
				'custom-url-shortener',
				'dotfiles',
				'game-maps',
				'hackathon',
				'image-signer',
				'jerboa88-github-io',
				'jerboa88',
				'make-me-laugh',
				'rtg-for-outlook',
				'tinyi18n',
			],
		},
	},
};
