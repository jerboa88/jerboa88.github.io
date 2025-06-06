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

const startDateSortFn = (a: Role, b: Role) =>
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
				sortFn: startDateSortFn,
			},
			[RoleType.Education]: {
				limit: 0,
				sortFn: startDateSortFn,
			},
			[RoleType.Volunteering]: {
				limit: 0,
				sortFn: startDateSortFn,
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
				'image-signer',
				'jerboa88-github-io',
				'jerboa88',
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
				sortFn: startDateSortFn,
			},
			education: {
				limit: 1,
				sortFn: startDateSortFn,
			},
			volunteering: {
				limit: 0,
				sortFn: startDateSortFn,
			},
		},
		[ContentType.Skills]: {
			[SkillType.Languages]: {
				limit: 10,
				[EntryVisibility.Hide]: [
					'Bash',
					'Datalog',
					'Kotlin',
					'Liquid Template Language',
					'Lisp',
					'MIPS Assembly',
					'Nix',
				],
			},
			[SkillType.Technologies]: {
				limit: 10,
				[EntryVisibility.Hide]: [
					'CUDA',
					'Electron',
					'GatsbyJS',
					'Gulp',
					'Jekyll',
					'Jest',
					'JSP',
					'JUnit',
					'Linux',
					'NumPy',
					'Oracle DB',
					'Puppeteer',
					'Regular Expressions',
				],
			},
			[SkillType.Tools]: {
				limit: 0,
				[EntryVisibility.Hide]: ['Blender', 'GIMP', 'Inkscape', 'Slack'],
			},
			[SkillType.Topics]: {
				limit: 0,
			},
		},
		[ContentType.Projects]: {
			limit: 4,
			sortFn: createdAtSortFn,
			[EntryVisibility.Pin]: [],
			[EntryVisibility.Show]: [],
			[EntryVisibility.Hide]: [
				'168421',
				'actions-sandbox',
				'actions-sandbox-2',
				'actions-sandbox-3',
				'CMPUT301W20T24-H03/on-my-way',
				'cringe-craft',
				'custom-url-shortener',
				'dotfiles',
				'game-maps',
				'image-signer',
				'internal-domain-name-calculator-for-true-charts-apps',
				'jerboa88-github-io',
				'jerboa88',
				'rtg-for-outlook',
				'shared-file-finder-for-google-drive',
				'tinyi18n',
				'watch-history-exporter-for-amazon-prime-video',
			],
		},
	},
} as const;
