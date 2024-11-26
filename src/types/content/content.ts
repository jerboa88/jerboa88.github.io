/**
 * Type definitions for page content (roles, skills, projects, etc.)
 */

import type { AbsolutePathString } from '../strings.ts';
import { SkillType } from './skills.ts';

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
type PagesContentEntryConfig = {
	limit?: number;
	[EntryVisibility.Pin]?: string[];
	[EntryVisibility.Show]?: string[];
	[EntryVisibility.Hide]?: string[];
};

/**
 * Config object used to define page content for a single page
 */
export interface PageContentConfig {
	// TODO: Create ContentType enum for this
	roles: {
		// TODO: Create RoleType enum for this
		employment: PagesContentEntryConfig;
		education: PagesContentEntryConfig;
		volunteering: PagesContentEntryConfig;
	};
	skills: {
		[SkillType.Languages]: PagesContentEntryConfig;
		[SkillType.Technologies]: PagesContentEntryConfig;
		[SkillType.Tools]: PagesContentEntryConfig;
		[SkillType.Topics]: PagesContentEntryConfig;
	};
	projects: PagesContentEntryConfig;
}

/**
 * Config object used to define page content
 */
export type PagesContentConfig = {
	[pagePath: AbsolutePathString]: PageContentConfig;
};
