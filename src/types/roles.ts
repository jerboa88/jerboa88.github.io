/**
 * Type definitions for roles and role configs
 */

import type {
	CityAndStateString,
	DateString,
	SentenceString,
	UrlString,
} from './strings';
import type { Overwrite } from './utils';

/**
 * An enumeration of possible employment role types
 */
type EmploymentRoleTypes = 'internship' | 'summer job';

/**
 * Config object used to define roles
 *
 * @param type - The type of role (ex. "internship")
 * @param title - The title of the role
 * @param company - The name of the company
 * @param companyUrl - The URL of the company's website
 * @param startDate - The start date of the role
 * @param endDate - The end date of the role
 * @param location - The location of the role
 * @param bullets - A list of bullet points describing the role
 */
export type RoleConfig = {
	type?: string;
	title: Capitalize<string>;
	company: Capitalize<string>;
	companyUrl: UrlString;
	startDate: DateString;
	endDate: DateString;
	location: CityAndStateString;
	bullets: SentenceString[];
};

/**
 * Role object used to represent academic and volunteer positions
 */
export type Role = Overwrite<
	RoleConfig,
	{
		startDate: Date;
		endDate: Date;
	}
>;

/**
 * Config object used to define employment roles
 */
export type EmploymentRoleConfig = Overwrite<
	RoleConfig,
	{
		type?: EmploymentRoleTypes;
	}
>;

/**
 * Role object used to represent employment roles
 */
export type EmploymentRole = Overwrite<
	Role,
	{
		type?: EmploymentRoleTypes;
	}
>;
