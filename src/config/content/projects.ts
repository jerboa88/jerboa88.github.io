/*
	Coding/design projects
	----------------------
*/

import {
	ProjectCategory,
	ProjectType,
	type ProjectsConfig,
	SchemaApplicationCategory,
	SchemaType,
} from '../../types/content/projects.ts';

export const PROJECTS_CONFIG: ProjectsConfig = {
	[ProjectType.Other]: [
		{
			slug: 'pathfinder-v2',
			name: 'Pathfinder v2',
			description:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways.',
			background:
				'A web application designed to assist young individuals in discovering and pursuing potential career pathways. Created as part of a class project with 5 other team members, this React-based web app was written with Django on the backend and Next.js on the frontend.',
			category: ProjectCategory.App,
			subcategory: 'Web',
			schema: {
				type: SchemaType.Web,
				applicationCategory: SchemaApplicationCategory.Educational,
				operatingSystem: 'Any',
			},
			languages: ['CSS', 'JavaScript', 'Python'],
			technologies: ['React', 'Django', 'Next.js', 'OpenStack'],
			tools: ['VS Code'],
			topics: ['Agile'],
			createdAt: '2023-01-17',
			updatedAt: '2023-04-10',
			url: 'https://cmput401.ca/projects/1a890021-cf4c-48d6-93c0-666ca1125373',
		},
		{
			slug: 'ridify',
			name: 'Ridify',
			description:
				'A command line implementation of a ride sharing app written for a class project.',
			background:
				'A command line implementation of a ride sharing app written for a class project. Collaborated with teammates to integrate a command line interface with a SQL database via the SQLite library in Python.',
			category: ProjectCategory.App,
			subcategory: 'CLI',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Travel,
				operatingSystem: 'Any',
			},
			languages: ['Python', 'SQL'],
			technologies: ['SQLite'],
			createdAt: '2018-11-01',
			updatedAt: '2018-12-01',
		},
		{
			slug: 'tes-forecaster-add-in',
			name: 'TES Forecaster Add-in',
			description:
				'An Excel add-in that generates forecasts using Triple Exponential Smoothing (TES).',
			background:
				'A decision support system that generates forecasts of time-series data using triple exponential smoothing. Created as part of a class project with 3 other team members, this Excel add-in was written using Visual Basic for Applications (VBA) and the Solver library.',
			category: ProjectCategory.Plugin,
			subcategory: 'Excel',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Business,
				operatingSystem: 'Windows',
			},
			languages: ['VBA'],
			tools: ['Excel', 'VS Code'],
			createdAt: '2022-11-11',
			updatedAt: '2022-12-11',
		},
		{
			slug: 'email-alias-generator',
			name: 'Email Alias Generator',
			description:
				'A browser extension to generate custom email address aliases based on site names.',
			background:
				'A browser extension that generates custom email address aliases based on the name of the current site. This extension was designed to be used alongside password managers to create unique email addresses for each site you visit to improve privacy and security.',
			category: ProjectCategory.Extension,
			subcategory: 'Browser',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Browser,
				operatingSystem: 'Any',
			},
			languages: ['CSS', 'HTML', 'JavaScript'],
			tools: ['Chrome', 'Firefox', 'Edge', 'Opera', 'VS Code'],
			createdAt: '2022-03-18',
			updatedAt: '2024-03-24',
		},
		{
			slug: 'resume',
			name: 'Resume (v1)',
			description:
				'My personal resume, made using Jekyll and the Liquid template language.',
			background:
				'A previous version of my resume, made using Jekyll and the Liquid template language. To build the resume, past jobs, schools, and projects are defined in Markdown files, a Liquid template is used to conditionally include and format them, and finally, Jekyll is used to render the template into a static HTML file. This allows for easier updates when compared to a resume made with a word processor.',
			category: ProjectCategory.Website,
			schema: {
				type: SchemaType.Web,
				applicationCategory: SchemaApplicationCategory.Lifestyle,
				operatingSystem: 'Any',
			},
			languages: ['HTML', 'SCSS', 'Liquid'],
			tools: ['VS Code'],
			createdAt: '2019-01-25',
			updatedAt: '2024-03-16',
		},
		{
			slug: 'view-image-transparency',
			name: 'View Image Transparency',
			description:
				'A Chrome extension that displays a checkered background behind transparent images.',
			background:
				'A Chrome extension that displays a checkered background behind transparent images. At the time this extension was made, Chrome displayed transparent images with a solid background, making it difficult to tell whether the background of an image was actually transparent or not. This extension fixed that issue and is one of the first Chrome extensions I ever made.',
			category: ProjectCategory.Extension,
			subcategory: 'Browser',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Browser,
				operatingSystem: 'Any',
			},
			languages: ['CSS', 'HTML', 'JavaScript'],
			tools: ['Sublime Text', 'Chrome'],
			createdAt: '2015-02-20',
			updatedAt: '2015-02-26',
		},
		{
			slug: 'tools-for-jira',
			name: 'Tools for Jira',
			description:
				'A browser extension that provides context menu tools to make working with Jira tickets easier.',
			background:
				'A browser extension that provides context menu tools to make working with Jira tickets easier. During my internship at Haemonetics, I noticed that we were wasting time manually copying and pasting information from Jira tickets into other tools. I created this extension in my free time and distributed it to the team in order to improve efficiency and reduce developer frustration.',
			category: ProjectCategory.Extension,
			subcategory: 'Browser',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Browser,
				operatingSystem: 'Any',
			},
			languages: ['JavaScript'],
			tools: ['Jira', 'Chrome', 'Firefox', 'Edge', 'Opera', 'VS Code'],
			createdAt: '2020-12-06',
			updatedAt: '2020-12-06',
		},
		{
			slug: 'mips-variable-replacer',
			name: 'MIPS Variable Replacer',
			description:
				'A command-line tool to simplify development in MIPS assembly. Use easy to remember variable names in MIPS and map them to actual registers before assembling.',
			background:
				'A command-line tool to simplify development in MIPS assembly. While taking a computer architecture course in University, I though it would be interesting to have a tool for debugging MIPS assembly that would allow me to use variable names instead of having to remember which registers were available and what they were storing. Written in Python, this tool acts like a preprocessor for MIPS that lets you use custom register names and map them to actual registers before assembling.',
			category: ProjectCategory.App,
			subcategory: 'CLI',
			schema: {
				type: SchemaType.Software,
				applicationCategory: SchemaApplicationCategory.Developer,
				operatingSystem: 'Any',
			},
			languages: ['Python', 'MIPS'],
			tools: ['VS Code'],
			createdAt: '2019-03-11',
			updatedAt: '2019-03-14',
		},
	],
} as const;
