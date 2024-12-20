/*
	A collection of functions to manage and transform roles shown on pages
	----------------------------------------------------------------------
*/

import { rolesConfig } from '../../config/content/roles.ts';
import type { PageContentEntryConfig } from '../../types/content/content.ts';
import {
	type EducationRole,
	type EmploymentRole,
	type Role,
	type RoleConfig,
	RoleType,
	type VolunteeringRole,
} from '../../types/content/roles.ts';
import { limit } from '../../utils/other.ts';
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
