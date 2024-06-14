/*
	Color mappings for color coding various UI elements
	---------------------------------------------------
*/

import type { ColorMappingsConfigInterface } from '../common/types';

export default {
	projectType: {
		'android app': 'bg-lime-500',
		extension: 'bg-amber-500',
		'cli app': 'bg-red-500',
		'js library': 'bg-green-500',
		'node.js module': 'bg-green-500',
		markdown: 'bg-purple-500',
		website: 'bg-orange-500',
		'web app': 'bg-orange-500',
		other: 'bg-blue-500',
		'gimp plugin': 'bg-blue-500',
	},
	roleType: {
		internship: 'bg-secondary',
		'summer job': 'bg-secondary',
	},
} as ColorMappingsConfigInterface;
