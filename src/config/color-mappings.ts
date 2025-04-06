/*
	Color mappings for color coding various UI elements
	---------------------------------------------------
*/

import { ProjectCategory } from '../types/content/projects.ts';
import { RoleCategory } from '../types/content/roles.ts';
import type { ColorMappingsConfig } from '../types/other.ts';

export const COLOR_MAPPINGS_CONFIG: ColorMappingsConfig = {
	default: 'bg-rose-600',
	projectCategory: {
		[ProjectCategory.App]: 'bg-red-600',
		[ProjectCategory.Container]: 'bg-blue-600',
		[ProjectCategory.Document]: 'bg-purple-600',
		[ProjectCategory.Extension]: 'bg-amber-600',
		[ProjectCategory.Library]: 'bg-green-600',
		[ProjectCategory.Other]: 'bg-rose-600',
		[ProjectCategory.Plugin]: 'bg-orange-600',
		[ProjectCategory.Script]: 'bg-lime-600',
		[ProjectCategory.Website]: 'bg-sky-600',
	},
	roleCategory: {
		[RoleCategory.Internship]: 'bg-rose-600',
		[RoleCategory.SeasonalJob]: 'bg-rose-600',
	},
} as const;
