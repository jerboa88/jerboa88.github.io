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
		'Kotlin',
		'Lua',
		'Python',
		'R',
		'SASS/SCSS',
		'SQL',
		'VBA',
		// Uncommon
		'Bash',
		'Datalog',
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
		'Firebase',
		'Git',
		'Jest',
		'JSP',
		'JUnit',
		'Kubernetes',
		'Linux',
		'Next.js',
		'Node.js',
		'Oracle DB',
		'PostgreSQL',
		'Puppeteer',
		'React.js',
		'Spring Framework',
		'SQLite',
		'Tailwind CSS',
		'Vue.js',
		'Webpack',
		// Uncommon
		'CUDA',
		'Electron',
		'Gulp',
		'Jekyll',
		'NumPy',
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
