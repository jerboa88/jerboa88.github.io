/**
 * Type definitions for page content (roles, skills, projects, etc.)
 */

import type { SortFn } from '../other.ts';
import type { AbsolutePathString } from '../strings.ts';
import type { Project } from './projects.ts';
import { type Role, RoleType } from './roles.ts';
import { type Skill, SkillType } from './skills.ts';

export enum ContentType {
	Roles = 'roles',
	Skills = 'skills',
	Projects = 'projects',
}

/**
 * An enumeration of possible visibility states for entries
 *
 * @param Pin The entry will always be displayed in the list and will be used to curate other entries.
 * @param Show The entry will be displayed in the list, even if it is automatically excluded by a filter function.
 * @param Hide The entry will not be displayed in the list, even if it is automatically included by a filter function.
 */
export enum EntryVisibility {
	Pin = 'pin',
	Show = 'show',
	Hide = 'hide',
}

/**
 * Config object used to define a single content entry
 *
 * @param limit The maximum number of entries to display.
 * @param sortFn A function used to sort the entries.
 * @param [EntryVisibility.Pin] A list of IDs of entries to pin.
 * @param [EntryVisibility.Show] A list of IDs of entries to show.
 * @param [EntryVisibility.Hide] A list of IDs of entries to hide.
 */
export type PageContentEntryConfig<T> = {
	limit?: number;
	sortFn?: SortFn<T>;
	[EntryVisibility.Pin]?: string[];
	[EntryVisibility.Show]?: string[];
	[EntryVisibility.Hide]?: string[];
};

/**
 * Config object used to define page content for a single page
 */
export interface PageContentConfig {
	[ContentType.Roles]: {
		[RoleType.Employment]: PageContentEntryConfig<Role>;
		[RoleType.Education]: PageContentEntryConfig<Role>;
		[RoleType.Volunteering]: PageContentEntryConfig<Role>;
	};
	[ContentType.Skills]: {
		[SkillType.Languages]: PageContentEntryConfig<Skill>;
		[SkillType.Technologies]: PageContentEntryConfig<Skill>;
		[SkillType.Tools]: PageContentEntryConfig<Skill>;
		[SkillType.Topics]: PageContentEntryConfig<Skill>;
	};
	[ContentType.Projects]: PageContentEntryConfig<Project>;
}

/**
 * Config object used to define page content
 */
export type PagesContentConfig = {
	[pagePath: AbsolutePathString]: PageContentConfig;
};
