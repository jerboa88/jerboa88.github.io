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

export enum SchemaType {
	Mobile = 'MobileApplication',
	Software = 'SoftwareApplication',
	Web = 'WebApplication',
}

export enum SchemaApplicationCategory {
	Browser = 'BrowserApplication',
	Business = 'BusinessApplication',
	Communication = 'CommunicationApplication',
	Design = 'DesignApplication',
	DesktopEnhancement = 'DesktopEnhancementApplication',
	Developer = 'DeveloperApplication',
	Driver = 'DriverApplication',
	Educational = 'EducationalApplication',
	Entertainment = 'EntertainmentApplication',
	Finance = 'FinanceApplication',
	Game = 'GameApplication',
	Health = 'HealthApplication',
	Home = 'HomeApplication',
	Lifestyle = 'LifestyleApplication',
	Multimedia = 'MultimediaApplication',
	Reference = 'ReferenceApplication',
	Security = 'SecurityApplication',
	Shopping = 'ShoppingApplication',
	SocialNetworking = 'SocialNetworkingApplication',
	Sports = 'SportsApplication',
	Travel = 'TravelApplication',
	Utilities = 'UtilitiesApplication',
}

/**
 * A base project with common fields
 *
 * @remarks
 *
 * `createdAt` and `updatedAt` are stored as strings instead of Date objects because they are automatically serialized by Gatsby when passed to programmatically generated pages.
 *
 * @typeParam T - The type of project
 * @param createdAt - The date the project was created
 * @param description - A brief description of the project
 * @param schemaApplicationCategory - The schema.org application category of the project
 * @param schemaOperatingSystem - The schema.org operating system of the project
 * @param schemaType - The schema.org type of the project
 * @param type - The type of project
 * @param updatedAt - The date the project was last updated
 */
export type BaseProject<T extends ProjectType> = {
	createdAt: DateString;
	description: SentenceString;
	schemaApplicationCategory?: SchemaApplicationCategory;
	schemaOperatingSystem?: string;
	schemaType?: SchemaType;
	type: T;
	updatedAt: DateString;
};

/**
 * A manually added project
 *
 * @param category.color - The color of the project category
 * @param category.name - The name of the project category (ex. 'Website', 'CLI App', etc.)
 * @param exposition - A longer description of the project, if available. This is used as the project description on the resume page
 * @param languages - A list of programming languages used in the project
 * @param name - The name of the project
 * @param slug - The slug of the project
 * @param stargazerCount - The number of stars the project has
 * @param type - The type of project (Other)
 * @param url - The URL of the project
 */
export type OtherProject = BaseProject<ProjectType.Other> & {
	category: {
		color: string;
		name: Nullable<string>;
	};
	exposition: SentenceString;
	languages: string[];
	name: string;
	slug: string;
	stargazerCount?: number;
	url?: UrlString;
};

/**
 * A GitHub repo project
 *
 * @remarks
 *
 * This is based on the GitHubRepo type from the GitHub GraphQL API, with various fields overwritten for better specificity when mapping GraphQL types to TypeScript types
 *
 * @param exposition - A longer description of the project, if available. This is used as the project description on the resume page
 * @param url - The URL of the project
 */
export type GithubRepoProject = Overwrite<
	Queries.GithubRepo,
	BaseProject<ProjectType.GithubRepo> & {
		exposition?: SentenceString;
		url: UrlString;
	}
>;

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
	}
>;

/**
 * Config for manually added projects
 */
export type ProjectsConfig = {
	[ProjectType.Other]: OtherProjectConfig[];
};
