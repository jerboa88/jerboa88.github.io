/**
 * Type definitions for projects and project configs
 */

import { EntryPage, type EntryVisibility } from './other';
import type { DateString, SentenceString, UrlString } from './strings';
import type { Overwrite } from './utils';

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
 * A visibility config prop added to project configs
 */
type ProjectVisibilityProp = {
	visibility: {
		[EntryPage.Index]?: EntryVisibility;
		[EntryPage.Resume]?: EntryVisibility;
	};
};

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
 * Config for a GitHub repo project
 */
type GithubRepoProjectConfig = ProjectVisibilityProp &
	Pick<GithubRepoProject, 'category' | 'slug'>;

/**
 * Config for a manually added project
 */
type OtherProjectConfig = Partial<ProjectVisibilityProp> &
	Overwrite<
		OtherProject,
		{
			createdAt: DateString;
			description: SentenceString;
			exposition: SentenceString;
			type: string;
			updatedAt: DateString;
		}
	>;

/**
 * Union of all project config types
 */
export type ProjectConfig = GithubRepoProjectConfig | OtherProjectConfig;

/**
 * Config for all projects
 */
export type ProjectsConfig = {
	maxForPage: {
		[EntryPage.Index]: number;
		[EntryPage.Resume]: number;
	};
	projects: ProjectConfig[];
};

/**
 * Union of all project types
 */
export type Project = GithubRepoProject | OtherProject;
