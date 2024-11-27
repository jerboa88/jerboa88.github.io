/**
 * Type definitions for page content (roles, skills, projects, etc.)
 */

import type { AbsolutePathString } from '../strings.ts';
import { RoleType } from './roles.ts';
import { SkillType } from './skills.ts';

export enum ContentType {
	Roles = 'roles',
	Skills = 'skills',
	Projects = 'projects',
}

/**
 * An enumeration of possible visibility states for entries
 */
export enum EntryVisibility {
	Pin = 0,
	Show = 1,
	Hide = 2,
}

/**
 * An enumeration of possible page types where entries can be displayed
 */
export enum EntryPage {
	Index = 'index',
	Resume = 'resume',
}

/**
 * Config object used to define a single content entry
 */
export type PageContentEntryConfig = {
	limit?: number;
	[EntryVisibility.Pin]?: string[];
	[EntryVisibility.Show]?: string[];
	[EntryVisibility.Hide]?: string[];
};

/**
 * Config object used to define page content for a single page
 */
export interface PageContentConfig {
	[ContentType.Roles]: {
		[RoleType.Employment]: PageContentEntryConfig;
		[RoleType.Education]: PageContentEntryConfig;
		[RoleType.Volunteering]: PageContentEntryConfig;
	};
	[ContentType.Skills]: {
		[SkillType.Languages]: PageContentEntryConfig;
		[SkillType.Technologies]: PageContentEntryConfig;
		[SkillType.Tools]: PageContentEntryConfig;
		[SkillType.Topics]: PageContentEntryConfig;
	};
	[ContentType.Projects]: PageContentEntryConfig;
}

/**
 * Config object used to define page content
 */
export type PagesContentConfig = {
	[pagePath: AbsolutePathString]: PageContentConfig;
};
