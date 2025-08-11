/*
	Skills
	------
*/

import { SkillType, type SkillsConfig } from '../../types/content/skills.ts';

export const SKILLS_CONFIG: SkillsConfig = {
	[SkillType.Languages]: [
		// Common
		'C/C++',
		'CSS',
		'HTML',
		'Java',
		'JavaScript/TypeScript',
		'JSX/TSX',
		'Python',
		'R',
		'Regular Expressions',
		'SASS/SCSS',
		'SQL',
		'VBA',
		// Uncommon
		'Bash',
		'Datalog',
		'Kotlin',
		'Liquid Template Language',
		'Lisp',
		'Lua',
		'MIPS Assembly',
		'Nix',
	],
	[SkillType.Technologies]: [
		// Common
		'Astro',
		'Bun',
		'Cypress',
		'Django',
		'Docker',
		'Express.js',
		'FastAPI',
		'Firebase',
		'Git',
		'Joi',
		'Kubernetes',
		'Next.js',
		'Node.js',
		'Parcel',
		'PostCSS',
		'PostgreSQL',
		'React',
		'SolidJS',
		'Spring Framework',
		'SQLite',
		'Tailwind CSS',
		'Vite',
		'Vue',
		'Webpack',
		'Zod',
		// Uncommon
		'AVA',
		'CUDA',
		'Electron',
		'GatsbyJS',
		'Gulp',
		'Jekyll',
		'Jest',
		'JSP',
		'JUnit',
		'NumPy',
		'Oracle DB',
		'Puppeteer',
	],
	[SkillType.Tools]: [
		// Common
		'Android Studio',
		'GitHub',
		'Jira',
		'Linux',
		// Uncommon
		'Blender',
		'GIMP',
		'Inkscape',
		'Postman',
		'Slack',
		'Visual Studio Code',
		'Visual Studio',
	],
	[SkillType.Topics]: [
		'Agile Methodologies',
		'Code Review',
		'Communication',
		'OOP',
		'Unit Testing',
	],
} as const;
