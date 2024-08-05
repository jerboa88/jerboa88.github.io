/*
	Custom rules for projects showcased on the site
	-----------------------------------------------
*/

import {
	EntryVisibility,
	ProjectCategory,
	type ProjectsConfig,
} from '../common/types';

export const projectsConfig: ProjectsConfig = {
	maxForPage: {
		index: 100,
		resume: 40,
	},
	projects: [
		{
			category: ProjectCategory.GithubRepo,
			slug: '168421',
			visibility: {
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'compare-form-backends',
			visibility: {
				index: EntryVisibility.Show,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'custom-url-shortener',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'dotfiles',
			visibility: {
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'game-maps',
			visibility: {
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'gimp-average-layers',
			visibility: {
				index: EntryVisibility.Show,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'hackathon',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'image-signer',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'jerboa88',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'jerboa88-github-io',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'make-me-laugh',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'on-my-way',
			owner: 'jerboa88',
			visibility: {
				index: EntryVisibility.Show,
				resume: EntryVisibility.Pin,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'on-my-way',
			owner: 'CMPUT301W20T24-H03',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'rtg-for-outlook',
			visibility: {
				index: EntryVisibility.Hide,
				resume: EntryVisibility.Hide,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'tinyi18n',
			visibility: {
				resume: EntryVisibility.Hide,
			},
		},
	],
};
