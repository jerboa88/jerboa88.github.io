/*
	Coding/design projects
	----------------------
*/

import {
	ProjectCategory,
	type ProjectsConfig,
} from '../../types/content/projects.ts';

export const PROJECTS_CONFIG: ProjectsConfig = {
	[ProjectCategory.Other]: [
		{
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
		},
	],
} as const;
