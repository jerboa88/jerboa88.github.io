/**
 * Type definitions for skills and skill configs
 */

/**
 * An enumeration of possible skill types
 */
export enum SkillType {
	Languages = 'languages',
	Technologies = 'technologies',
	Tools = 'tools',
	Topics = 'topics',
}

/**
 * A union of string literals representing all language skills
 */
export type LanguageSkill =
	| 'Bash'
	| 'C/C++'
	| 'CSS'
	| 'Datalog'
	| 'HTML'
	| 'Java'
	| 'JavaScript/TypeScript'
	| 'Kotlin'
	| 'Liquid Template Language'
	| 'Lisp'
	| 'Lua'
	| 'MIPS Assembly'
	| 'Nix'
	| 'Python'
	| 'R'
	| 'SASS/SCSS'
	| 'SQL'
	| 'VBA';

/**
 * A union of string literals representing all technology skills
 */
export type TechnologySkill =
	| 'CUDA'
	| 'Django'
	| 'Docker'
	| 'Electron'
	| 'Express.js'
	| 'FastAPI'
	| 'GatsbyJS'
	| 'Firebase'
	| 'Git'
	| 'Gulp'
	| 'JSP'
	| 'Jekyll'
	| 'Jest'
	| 'JUnit'
	| 'Kubernetes'
	| 'Linux'
	| 'Next.js'
	| 'Node.js'
	| 'NumPy'
	| 'Oracle DB'
	| 'PostgreSQL'
	| 'Postman'
	| 'Puppeteer'
	| 'React'
	| 'Regular Expressions'
	| 'Spring Framework'
	| 'SQLite'
	| 'Tailwind CSS'
	| 'Vue'
	| 'Webpack';

/**
 * A union of string literals representing all tool skills
 */
export type ToolSkill =
	| 'Android Studio'
	| 'Blender'
	| 'GIMP'
	| 'GitHub'
	| 'Inkscape'
	| 'Jira'
	| 'Slack'
	| 'Visual Studio Code'
	| 'Visual Studio';

/**
 * A union of string literals representing all topic skills
 */
export type TopicSkill =
	| 'Agile Methodologies'
	| 'Code Review'
	| 'Communication'
	| 'OOP'
	| 'Unit Testing';

/**
 * A type representing a skill
 */
export type Skill = LanguageSkill | TechnologySkill | ToolSkill | TopicSkill;

/**
 * Config object used to define skills
 *
 * @param languages - A list of formal languages
 * @param technologies - A list of technologies (ie. frameworks, libraries, etc.)
 * @param tools - A list of tools
 * @param topics - A list of topics
 */
export type SkillsConfig = {
	[SkillType.Languages]: readonly LanguageSkill[];
	[SkillType.Technologies]: readonly TechnologySkill[];
	[SkillType.Tools]: readonly ToolSkill[];
	[SkillType.Topics]: readonly TopicSkill[];
};
