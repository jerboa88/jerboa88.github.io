/**
 * Type definitions for projects and project configs
 */

import type { DateString, SentenceString, UrlString } from '../strings.ts';
import type { Nullable, Overwrite } from '../utils.ts';

/**
 * An enumeration of possible project types
 *
 * @enum {number}
 */
export enum ProjectType {
	Other = 0,
	GithubRepo = 1,
}

/**
 * Possible project categories
 */
export enum ProjectCategory {
	App = 'App',
	Container = 'Container',
	Document = 'Document',
	Extension = 'Extension',
	Library = 'Library',
	Other = 'Other',
	Plugin = 'Plugin',
	Script = 'Script',
	Website = 'Website',
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
 * @param category.color - The color of the project category
 * @param category.name - The name of the project category (ex. 'Website', 'CLI App', etc.)
 * @param updatedAt - The date the project was last updated
 */
export type BaseProject = {
	createdAt: Date;
	description: string;
	exposition: Nullable<string>;
	languages: string[];
	name: string;
	slug: string;
	category: {
		color: string;
		name: Nullable<string>;
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
	type: ProjectType.Other;
	stargazerCount?: number;
	url?: UrlString;
};

/**
 * A GitHub repo project
 */
export type GithubRepoProject = Overwrite<
	Queries.GithubRepo,
	{
		description: SentenceString;
		exposition?: SentenceString;
		url: UrlString;
	}
> & {
	type: ProjectType.GithubRepo;
};

/**
 * Union of all project types
 */
export type Project = GithubRepoProject | OtherProject;

/**
 * Config for a manually added project
 */
export type OtherProjectConfig = Overwrite<
	Omit<OtherProject, 'type'>,
	{
		category: string;
		createdAt: DateString;
		description: SentenceString;
		exposition: SentenceString;
		updatedAt: DateString;
	}
>;

/**
 * Config for manually added projects
 */
export type ProjectsConfig = {
	[ProjectType.Other]: OtherProjectConfig[];
};
