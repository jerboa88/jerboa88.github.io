/*
	Custom rules for projects showcased on the site
	-----------------------------------------------
*/

import { EntryVisibility } from '../types/other.ts';
import { ProjectCategory, type ProjectsConfig } from '../types/projects.ts';

export const projectsConfig: ProjectsConfig = {
	maxForPage: {
		index: 10,
		resume: 3,
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
			visibility: {
				index: EntryVisibility.Show,
				resume: EntryVisibility.Pin,
			},
		},
		{
			category: ProjectCategory.GithubRepo,
			slug: 'CMPUT301W20T24-H03/on-my-way',
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
		{
			category: ProjectCategory.Other,
			slug: 'pathfinder-v2',
			name: 'Pathfinder v2',
			description:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways.',
			exposition:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways. Created as part of a class project with 5 other team members, this React-based web app was written with Django on the backend and Next.js on the frontend.',
			type: 'Web App',
			languages: ['CSS', 'JavaScript', 'Python'],
			createdAt: '2023-01-17',
			updatedAt: '2023-04-10',
			url: 'https://cmput401.ca/projects/1a890021-cf4c-48d6-93c0-666ca1125373',
			visibility: {
				index: EntryVisibility.Hide,
			},
		},
	],
};
