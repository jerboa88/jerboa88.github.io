/*
	A collection of functions to manage and transform skills shown on pages
	-----------------------------------------------------------------------
*/

import { SKILLS_CONFIG } from '../../config/content/skills.ts';
import {
	type Skill,
	SkillType,
	type SkillsConfig,
} from '../../types/content/skills.ts';
import { keysOf } from '../../utils/other.ts';
import { getPageContentConfig } from '../config.ts';
import { filterEntries } from './utils.ts';

/**
 * Given a page path, returns an object containing the computed list of skills for each skill type.
 *
 * @param pagePath The path of the page.
 * @returns An object containing the computed list of skills for each skill type.
 */
export function getSkillsForPage(pagePath: string) {
	const pageSkillsConfig = getPageContentConfig(pagePath).skills;
	const skillSubsets: SkillsConfig = {
		[SkillType.Languages]: [],
		[SkillType.Technologies]: [],
		[SkillType.Tools]: [],
		[SkillType.Topics]: [],
	};
	const skillTypes = keysOf(skillSubsets);

	// For each skill type, get the computed list of skills
	for (const skillType of skillTypes) {
		skillSubsets[skillType] = filterEntries<Skill>(
			pagePath,
			SKILLS_CONFIG[skillType],
			pageSkillsConfig[skillType],
			(skill: Skill) => skill,
		);
	}

	return skillSubsets;
}
