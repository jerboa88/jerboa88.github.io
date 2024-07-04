/*
	Color mappings for color coding various UI elements
	---------------------------------------------------
*/

import type { ColorMappingsConfig } from '../common/types';

export const colorMappingsConfig: ColorMappingsConfig = {
	default: 'bg-rose-600',
	projectType: {
		'android app': 'bg-lime-600',
		extension: 'bg-amber-600',
		'cli app': 'bg-red-600',
		'js library': 'bg-green-600',
		'node.js module': 'bg-green-600',
		markdown: 'bg-purple-600',
		website: 'bg-orange-600',
		'web app': 'bg-orange-600',
		other: 'bg-blue-600',
		'gimp plugin': 'bg-blue-600',
	},
	roleType: {
		internship: 'bg-rose-600',
		'summer job': 'bg-rose-600',
	},
};
