/*
	A collection of functions to manage and transform roles shown on pages
	----------------------------------------------------------------------
*/

import { ROLES_CONFIG } from '../../config/content/roles.ts';
import {
	type Role,
	type RoleConfig,
	RoleType,
} from '../../types/content/roles.ts';
import { ifDefined, keysOf } from '../../utils/other.ts';
import { getPageContentConfig } from '../config.ts';
import { filterEntries } from './utils.ts';

// Types

type RoleSubsets = {
	[RoleType.Employment]: Role[];
	[RoleType.Education]: Role[];
	[RoleType.Volunteering]: Role[];
};

// Functions

/**
 * Build a role object from a role config object.
 *
 * @remarks
 *
 * This is necessary because the role config object uses strings for dates, while the role object uses Date objects.
 *
 * @typeParam T - The type of role.
 * @param roleConfig The role config object.
 * @returns The role object.
 */
function buildRole({
	category,
	startDate,
	endDate,
	...remainingProps
}: RoleConfig): Role {
	return {
		...remainingProps,
		...ifDefined({ category }),
		startDate: new Date(startDate),
		endDate: new Date(endDate),
	};
}

/**
 * Returns the role ID for a given role. The ID is its start date in the format 'YYYY-MM-DD'.
 *
 * @param role The role.
 * @returns A string representing the role ID.
 */
function getRoleId(role: Role) {
	return `${role.startDate.toISOString().slice(0, 10)}`;
}

/**
 * Given a page path, returns the computed list of roles for that page.
 *
 * @param pagePath The path of the page.
 * @returns An object containing the computed list of roles for each role type.
 */
export function getRolesForPage(pagePath: string) {
	const pageContentConfig = getPageContentConfig(pagePath);
	const pageRolesConfig = pageContentConfig?.roles;
	const roleSubsets: RoleSubsets = {
		[RoleType.Employment]: [],
		[RoleType.Education]: [],
		[RoleType.Volunteering]: [],
	};
	const roleTypes = keysOf(roleSubsets);

	// For each role type, get the computed list of roles
	for (const roleType of roleTypes) {
		roleSubsets[roleType] = filterEntries(
			pagePath,
			ROLES_CONFIG[roleType].map(buildRole),
			pageRolesConfig[roleType],
			getRoleId,
		);
	}

	return roleSubsets;
}
