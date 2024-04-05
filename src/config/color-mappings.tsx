/*
	Color mappings for color coding various UI elements
	---------------------------------------------------
*/


import type { ColorMappingsConfigInterface } from '../common/types';


// The comments prevent these classes from being purged by Tailwind CSS as we construct them at runtime
export default {
	projectType: {
		'android app': 'bg-lime-500',	// mouse-only:hover:bg-lime-500/75
		'extension': 'bg-amber-500',	// mouse-only:hover:bg-amber-500/75
		'cli app': 'bg-red-500',	// mouse-only:hover:bg-red-500/75
		'js library': 'bg-green-500',	// mouse-only:hover:bg-green-500/75
		'node.js module': 'bg-green-500',	// mouse-only:hover:bg-green-500/75
		'markdown': 'bg-purple-500',	// mouse-only:hover:bg-purple-500/75
		'website': 'bg-orange-500',	// mouse-only:hover:bg-orange-500/75
		'web app': 'bg-orange-500',	// mouse-only:hover:bg-orange-500/75
		'other': 'bg-blue-500',	// mouse-only:hover:bg-blue-500/75
		'gimp plugin': 'bg-blue-500',	// mouse-only:hover:bg-blue-500/75
	},
	roleType: {
		'internship': 'bg-secondary',	// mouse-only:hover:bg-secondary/75
		'summer job': 'bg-secondary',	// mouse-only:hover:bg-secondary/75
	},
} as ColorMappingsConfigInterface;
