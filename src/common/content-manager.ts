/*
	A collection of functions to manage and transform content shown on pages
	------------------------------------------------------------------------
*/

import { rolesConfig } from '../config/content/roles.ts';
import { skillsConfig } from '../config/content/skills.ts';
import {
	EntryVisibility,
	type PageContentEntryConfig,
} from '../types/content/content.ts';
import {
	type EducationRole,
	type EmploymentRole,
	type Role,
	type RoleConfig,
	RoleType,
	type VolunteeringRole,
} from '../types/content/roles.ts';
import {
	type Skill,
	SkillType,
	type SkillsConfig,
} from '../types/content/skills.ts';
import { getPageContentConfig } from './config-manager.ts';
import { findIndexOfSubstringInArray, limit } from './utils/other.ts';

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
 * Converts a role config object to a role object.
 *
 * @remarks
 *
 * This is necessary because the role config object uses strings for dates, while the role object uses Date objects.
 *
 * @typeParam T - The type of role.
 * @typeParam U - The corresponding type of role config.
 * @param roleConfig The role config object.
 * @returns The role object.
 */
function convertRoleConfigToRole<T extends Role, U extends RoleConfig<T>>(
	roleConfig: U,
): T {
	return {
		title: roleConfig.title,
		company: roleConfig.company,
		companyUrl: roleConfig.companyUrl,
		startDate: new Date(roleConfig.startDate),
		endDate: new Date(roleConfig.endDate),
		location: roleConfig.location,
		bullets: roleConfig.bullets,
	} as T;
}

/**
 * Returns a list of roles with formatted date objects
 *
 * @typeParam T - The type of role.
 * @typeParam U - The corresponding type of role config.
 * @param allRolesOfType The list of all roles of a type.
 * @param pageRolesConfig The page roles config object.
 * @returns The filtered list of roles of that type.
 */
function getFilteredRolesOfType<T extends Role, U extends RoleConfig<T>>(
	allRolesOfType: U[],
	pageRolesConfig: PageContentEntryConfig,
): T[] {
	const pageSkillLimit = getEntriesLimit(pageRolesConfig);
	const filteredRolesList = allRolesOfType
		.map(convertRoleConfigToRole<T, U>)
		.sort((a: T, b: T) => b.endDate.getTime() - a.endDate.getTime());

	return limit(filteredRolesList, pageSkillLimit);
}

/**
 * Given a page path, returns an object containing the computed list of roles for each role type.
 *
 * @param pagePath The path of the page.
 * @returns An object containing the computed list of roles for each role type.
 */
export function getRolesForPage(pagePath: string) {
	const pageRolesConfig = getPageContentConfig(pagePath).roles;
	const roleSubsets: {
		[RoleType.Employment]: EmploymentRole[];
		[RoleType.Education]: EducationRole[];
		[RoleType.Volunteering]: VolunteeringRole[];
	} = {
		[RoleType.Employment]: [],
		[RoleType.Education]: [],
		[RoleType.Volunteering]: [],
	};

	const roleTypes: RoleType[] = Object.keys(roleSubsets) as RoleType[];

	// For each role type, get the computed list of roles
	for (const roleType of roleTypes) {
		roleSubsets[roleType] = getFilteredRolesOfType(
			rolesConfig[roleType],
			pageRolesConfig[roleType] ?? {},
		);
	}

	return roleSubsets;
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