/*
	A collection of functions to manage and transform skills shown on pages
	-----------------------------------------------------------------------
*/

import { skillsConfig } from '../../config/content/skills.ts';
import {
	EntryVisibility,
	type PageContentEntryConfig,
} from '../../types/content/content.ts';
import {
	type Skill,
	SkillType,
	type SkillsConfig,
} from '../../types/content/skills.ts';
import { findIndexOfSubstringInArray, limit } from '../../utils/other.ts';
import { getPageContentConfig } from '../config.ts';

/**
 * Given a config object for a single content entry, returns the max amount of items to display. If the limit is not specified, returns the maximum safe integer.
 *
 * @param pageEntryConfig The config object for a single content entry.
 * @returns The max amount of items to display.
 */
function getEntriesLimit(pageEntryConfig: PageContentEntryConfig) {
	return pageEntryConfig?.limit ?? Number.MAX_SAFE_INTEGER;
}

/**
 * Given a list of all skills of a type and a list of skills from a page skills config object, returns a set of skills that match those from the page skills config object.
 *
 * @remarks
 *
 * Substring matching is used so that we can match skills that contain multiple words (ie. "JavaScript" will match "JavaScript/TypeScript").
 *
 * @param allSkillsOfType The list of all skills of a type.
 * @param pageSkillsOfType The list of desired skills from a page skills config object.
 * @returns The set of skills that match those from the page skills config object.
 */
function getSetOfMatchingSkills(
	allSkillsOfType: Skill[],
	pageSkillsOfType: string[],
) {
	const set = new Set<Skill>();

	for (const pageSkillName of pageSkillsOfType) {
		const matchIndex = findIndexOfSubstringInArray(
			allSkillsOfType,
			pageSkillName,
		);

		if (matchIndex === -1) {
			console.warn(`Configured skill "${pageSkillName}" not found`);
			continue;
		}

		set.add(allSkillsOfType[matchIndex]);
	}

	return set;
}

/**
 * Given a list of all skills of a type and a page skills config object, returns a filtered list of skills of that type.
 *
 * @remarks
 *
 * The list is:
 * - filtered based on the visibility settings in the page skills config object. Pinned skills are always shown, hidden skills are always hidden, and the rest are shown if they can be included within the limit
 * - limited to the number of skills specified in the page skills config object. If no limit is specified, the list is not limited
 * - sorted alphabetically
 *
 * @param allSkillsOfType The list of all skills of a type.
 * @param pageSkillsConfig The page skills config object.
 * @returns The filtered list of skills of that type.
 */
function getFilteredSkillsOfType(
	allSkillsOfType: Skill[],
	pageSkillsConfig: PageContentEntryConfig,
) {
	const pageSkillLimit = getEntriesLimit(pageSkillsConfig);
	const skillSets = {
		[EntryVisibility.Pin]: new Set<Skill>(),
		[EntryVisibility.Show]: new Set<Skill>(),
		[EntryVisibility.Hide]: new Set<Skill>(),
	};
	const visibilityTypes: EntryVisibility[] = Object.keys(skillSets).map(
		Number,
	) as EntryVisibility[];

	for (const visibilityType of visibilityTypes) {
		const pageSkills = pageSkillsConfig[visibilityType];

		if (!pageSkills) {
			continue;
		}

		skillSets[visibilityType] = getSetOfMatchingSkills(
			allSkillsOfType,
			pageSkills,
		);
	}

	const filteredSkillsList = limit(
		Array.from(
			skillSets[EntryVisibility.Pin]
				.union(skillSets[EntryVisibility.Show])
				.union(new Set(allSkillsOfType))
				.difference(skillSets[EntryVisibility.Hide]),
		),
		pageSkillLimit,
	);

	filteredSkillsList.sort();

	return filteredSkillsList;
}

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

	const skillTypes: SkillType[] = Object.keys(skillSubsets) as SkillType[];

	// For each skill type, get the computed list of skills
	for (const skillType of skillTypes) {
		skillSubsets[skillType] = getFilteredSkillsOfType(
			skillsConfig[skillType],
			pageSkillsConfig[skillType] ?? {},
		);
	}

	return skillSubsets;
}
