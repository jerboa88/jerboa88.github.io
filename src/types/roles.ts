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
 * A base role with common fields
 *
 * @param title - The title of the role
 * @param company - The name of the company
 * @param companyUrl - The URL of the company's website
 * @param startDate - The start date of the role
 * @param endDate - The end date of the role
 * @param location - The location of the role
 * @param bullets - A list of bullet points describing the role
 */
export type BaseRole = {
	title: Capitalize<string>;
	company: Capitalize<string>;
	companyUrl: UrlString;
	startDate: Date;
	endDate: Date;
	location: CityAndStateString;
	bullets: SentenceString[];
};

/**
 * Employment role type
 *
 * @param type - The type of employment (ex. "internship")
 */
export type EmploymentRole = Overwrite<
	BaseRole,
	{ type?: 'internship' | 'summer job' }
>;

/**
 * Education role type
 *
 * @param type - The type of education (ex. "post-secondary")
 */
export type EducationRole = Overwrite<
	BaseRole,
	{ type?: 'post-secondary' | 'high school' }
>;

/**
 * Volunteering role type
 */
export type VolunteeringRole = BaseRole;

/**
 * Union of all role types
 */
export type Role = EmploymentRole | EducationRole | VolunteeringRole;

/**
 * Config object used to define roles
 *
 * @typeParam T - The role type. If not provided, defaults to {@link Role}
 */
export type RolesConfig<T extends Role = Role> = Overwrite<
	T,
	{ startDate: DateString; endDate: DateString }
>[];
