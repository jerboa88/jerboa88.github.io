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
		'Lua',
		'Python',
		'R',
		'SASS/SCSS',
		'SQL',
		'VBA',
		// Uncommon
		'Bash',
		'Datalog',
		'Kotlin',
		'Liquid Template Language',
		'Lisp',
		'MIPS Assembly',
		'Nix',
	],
	[SkillType.Technologies]: [
		// Common
		'Django',
		'Docker',
		'FastAPI',
		'GatsbyJS',
		'Express.js',
		'Firebase',
		'Git',
		'Kubernetes',
		'Next.js',
		'Node.js',
		'PostgreSQL',
		'React',
		'Spring Framework',
		'SQLite',
		'Tailwind CSS',
		'Vue',
		'Webpack',
		// Uncommon
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
		'Postman',
		'Puppeteer',
		'Regular Expressions',
	],
	[SkillType.Tools]: [
		// Common
		'Android Studio',
		'GitHub',
		'Jira',
		'Visual Studio Code',
		'Visual Studio',
		// Uncommon
		'Blender',
		'GIMP',
		'Inkscape',
		'Slack',
	],
	[SkillType.Topics]: [
		'Agile Methodologies',
		'Code Review',
		'Communication',
		'OOP',
		'Unit Testing',
	],
} as const;
