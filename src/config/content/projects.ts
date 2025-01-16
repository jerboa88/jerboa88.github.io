/*
	Coding/design projects
	----------------------
*/

import {
	ProjectType,
	type ProjectsConfig,
} from '../../types/content/projects.ts';

export const PROJECTS_CONFIG: ProjectsConfig = {
	[ProjectType.Other]: [
		{
			slug: 'pathfinder-v2',
			name: 'Pathfinder v2',
			description:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways.',
			exposition:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways. Created as part of a class project with 5 other team members, this React-based web app was written with Django on the backend and Next.js on the frontend.',
			category: 'Web App',
			languages: ['CSS', 'JavaScript', 'Python'],
			createdAt: '2023-01-17',
			updatedAt: '2023-04-10',
			url: 'https://cmput401.ca/projects/1a890021-cf4c-48d6-93c0-666ca1125373',
		},
		{
			slug: 'ridify',
			name: 'Ridify',
			description:
				'A command line implementation of a ride sharing app written for a class project.',
			exposition:
				'A command line implementation of a ride sharing app written for a class project. Collaborated with teammates to integrate a command line interface with a SQL database via the SQLite library in Python.',
			category: 'CLI App',
			languages: ['Python', 'SQL'],
			createdAt: '2018-11-01',
			updatedAt: '2018-12-01',
		},
		{
			slug: 'tes-forecaster-add-in',
			name: 'TES Forecaster Add-in',
			description:
				'An Excel add-in that generates forecasts using Triple Exponential Smoothing (TES).',
			exposition:
				'A decision support system that generates forecasts of time-series data using triple exponential smoothing. Created as part of a class project with 3 other team members, this Excel add-in was written using Visual Basic for Applications (VBA) and the Solver library.',
			category: 'Excel Add-in',
			languages: ['VBA'],
			createdAt: '2022-11-11',
			updatedAt: '2022-12-11',
		},
	],
} as const;
