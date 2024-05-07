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
		'accent': '#000',								// Pure black
		'neutral': '#111',
		'info': '#0284C7',							// TW Sky 600
		'success': '#16A34A',						// TW Green 600
		'warning': '#D97706',						// TW Amber 600
		'error': '#DC2626',							// TW Red 600
		'base-100': 'hsl(0 0% 100%)',
		'base-200': 'hsl(0 0% 98%)',
		'base-300': 'hsl(0 0% 96%)',
		'base-content': '#000',
	},
	dark: {
		'primary-header': '#14B8A6',		// TW Teal 500
		'primary': '#2DD4BF',						// TW Teal 400
		'secondary-header': '#F43F5E',	// TW Rose 500
		'secondary': '#FB7185',					// TW Rose 400
		'accent': '#FFF',								// Pure white
		'neutral': '#111',
		'info': '#38BDF8',							// TW Sky 400
		'success': '#4ADE80',						// TW Green 400
		'warning': '#FBBF24',						// TW Amber 400
		'error': '#F87171',							// TW Red 400
		'base-100': '#131313',
		'base-200': '#080808',
		'base-300': '#030303',
		'base-content': '#FFF',
	},
} as ThemesConfigInterface;
