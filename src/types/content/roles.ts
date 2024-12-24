/**
 * Type definitions for roles and role configs
 */

import type {
	CityAndStateString,
	DateString,
	SentenceString,
	UrlString,
} from '../strings.ts';
import type { Overwrite } from '../utils.ts';

/**
 * An enumeration of possible role types
 */
export enum RoleType {
	Employment = 'employment',
	Education = 'education',
	Volunteering = 'volunteering',
}

/**
 * Possible role categories
 */
export type RoleCategory = 'seasonal' | 'internship';

/**
 * A base role with common fields
 *
 * @param category A string describing the category of the role (ex. 'internship', 'seasonal', etc.).
 * @param title The title of the role.
 * @param company The name of the company.
 * @param companyUrl The URL of the company's .website.
 * @param startDate The start date of the role.
 * @param endDate The end date of the role.
 * @param location The location of the role.
 * @param bullets A list of bullet points describing the role.
 */
export type Role = {
	category?: RoleCategory;
	title: Capitalize<string>;
	company: Capitalize<string>;
	companyUrl: UrlString;
	startDate: Date;
	endDate: Date;
	location: CityAndStateString;
	bullets: SentenceString[];
};

/**
 * Config object used to define a single role
 *
 * @typeParam T The role type.
 */
export type RoleConfig = Overwrite<
	Role,
	{ startDate: DateString; endDate: DateString }
>;

/**
 * Config object used to define roles
 */
export type RolesConfig = {
	[RoleType.Employment]: RoleConfig[];
	[RoleType.Education]: RoleConfig[];
	[RoleType.Volunteering]: RoleConfig[];
};
