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
 * A type representing a skill
 */
export type Skill = Capitalize<string>;

/**
 * Config object used to define skills
 *
 * @param languages - A list of formal languages
 * @param technologies - A list of technologies (ie. frameworks, libraries, etc.)
 * @param tools - A list of tools
 * @param topics - A list of topics
 */
export type SkillsConfig = {
	[SkillType.Languages]: Skill[];
	[SkillType.Technologies]: Skill[];
	[SkillType.Tools]: Skill[];
	[SkillType.Topics]: Skill[];
};
