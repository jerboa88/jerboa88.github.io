/*
	Content config for individual pages
	-----------------------------------
*/

import type { PagesContentConfig } from '../../types/content/content.ts';
import { ContentType, EntryVisibility } from '../../types/content/content.ts';
import type { Project } from '../../types/content/projects.ts';
import { type Role, RoleType } from '../../types/content/roles.ts';
import { SkillType } from '../../types/content/skills.ts';
import { RESUME_PATH } from '../constants.ts';
import { INDEX_PATH } from '../constants.ts';

const roleSortFn = (a: Role, b: Role) =>
	new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
const stargazerCountSortFn = (a: Project, b: Project) =>
	(b.stargazerCount ?? 0) - (a.stargazerCount ?? 0);
const createdAtSortFn = (a: Project, b: Project) =>
	new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const PAGES_CONTENT_CONFIG: PagesContentConfig = {
	[INDEX_PATH]: {
		[ContentType.Roles]: {
			[RoleType.Employment]: {
				limit: 2,
				// TODO: Allow this to be configured on parent object
				sortFn: roleSortFn,
			},
			[RoleType.Education]: {
				limit: 0,
				sortFn: roleSortFn,
			},
			[RoleType.Volunteering]: {
				limit: 0,
				sortFn: roleSortFn,
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
			sortFn: stargazerCountSortFn,
			[EntryVisibility.Pin]: [],
			[EntryVisibility.Show]: ['gimp-average-layers', 'on-my-way'],
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
				// TODO: Allow this to be configured on parent object
				sortFn: roleSortFn,
			},
			education: {
				limit: 1,
				sortFn: roleSortFn,
			},
			volunteering: {
				limit: 0,
				sortFn: roleSortFn,
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
			sortFn: createdAtSortFn,
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
} as const;
