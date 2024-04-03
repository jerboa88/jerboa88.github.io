/*
	DaisyUI themes for the site
	---------------------------
*/


import type { ThemesConfigInterface } from '../common/types';


export default {
	light: {
		'primary-header': '#0D9488',		// TW Teal 600
		'primary': '#0F766E',						// TW Teal 700
		'secondary-header': '#BE123C',	// TW Rose 700
		'secondary': '#E11D48',					// TW Rose 600
		'accent': '#D97706',						// TW Amber 600
		'neutral': '#111111',
		'info': '#0369A1',							// TW Sky 700
		'success': '#15803D',						// TW Green 700
		'warning': '#A16207',						// TW Yellow 700
		'error': '#B91C1C',							// TW Red 700
		'base-100': 'hsl(0 0% 100%)',
		'base-200': 'hsl(0 0% 98%)',
		'base-300': 'hsl(0 0% 96%)',
		'base-content': '#000000',
	},
	dark: {
		'primary-header': '#14B8A6',		// TW Teal 500
		'primary': '#2DD4BF',						// TW Teal 400
		'secondary-header': '#F43F5E',	// TW Rose 500
		'secondary': '#FB7185',					// TW Rose 400
		'accent': '#FBBF24',						// TW Amber 400
		'neutral': '#111111',
		'info': '#7DD3FC',							// TW Sky 300
		'success': '#86EFAC',						// TW Green 300
		'warning': '#FDE047',						// TW Yellow 300
		'error': '#FCA5A5',							// TW Red 300
		'base-100': '#151515',
		'base-200': '#090909',
		'base-300': '#030303',
		'base-content': '#FFFFFF',
	},
} as ThemesConfigInterface;
