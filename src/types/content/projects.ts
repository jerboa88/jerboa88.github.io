/**
 * Type definitions for projects and project configs
 */

import type { DateString, SentenceString, UrlString } from '../strings.ts';
import type { Overwrite } from '../utils.ts';

// TODO: Rename to ProjectType?
/**
 * An enumeration of possible project categories
 *
 * @enum {number}
 */
export enum ProjectCategory {
	Other = 0,
	GithubRepo = 1,
}

/**
 * A base project with common fields
 *
 * @param createdAt - The date the project was created
 * @param description - A brief description of the project
 * @param exposition - A longer description of the project, if available. This is used as the project description on the resume page
 * @param languages - A list of programming languages used in the project
 * @param name - The name of the project
 * @param slug - The slug of the project
 * @param type.color - The color of the project type
 * @param type.name - The name of the project type (ex. "Website")
 * @param updatedAt - The date the project was last updated
 */
export type BaseProject = {
	createdAt: Date;
	description: string;
	exposition: string | null;
	languages: string[];
	name: string;
	slug: string;
	type: {
		color: string;
		name: string | null;
	};
	updatedAt: Date;
};

/**
 * A manually added project
 */
export type OtherProject = Overwrite<
	BaseProject,
	{
		description: SentenceString;
		exposition: SentenceString;
	}
> & {
	category: ProjectCategory.Other;
	stargazerCount?: number;
	url?: UrlString;
};

/**
 * A GitHub repo project
 */
export type GithubRepoProject = Queries.GithubRepo & {
	category: ProjectCategory.GithubRepo;
};

/**
 * Union of all project types
 */
export type Project = GithubRepoProject | OtherProject;

/**
 * Config for a manually added project
 */
type OtherProjectConfig = Overwrite<
	Omit<OtherProject, 'category'>,
	{
		createdAt: DateString;
		description: SentenceString;
		exposition: SentenceString;
		type: string;
		updatedAt: DateString;
	}
>;

/**
 * Config for manually added projects
 */
export type ProjectsConfig = {
	[ProjectCategory.Other]: OtherProjectConfig[];
};
