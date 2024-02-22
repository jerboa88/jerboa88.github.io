/*
	DaisyUI themes for the site
	---------------------------
*/


import type { ThemesConfigInterface } from '../common/types';


export default {
	light: {
		'primary-header': '#F4511E',		// MD Deep Orange 600
		'primary': '#E64A19',						// MD Deep Orange 700
		'secondary-header': '#1976D2',	// MD Blue 700
		'secondary': '#1565C0',					// MD Blue 800
		'accent': '#673AB7',						// MD Purple 500
		'neutral': '#111111',
		'info': '#0277BD',							// MD Light Blue 800
		'success': '#558B2F',						// MD Light Green 800
		'warning': '#FF6F00',						// MD Amber 800
		'error': '#C62828',							// MD Red 800
		'base-100': 'hsl(0 0% 100%)',
		'base-200': 'hsl(0 0% 98%)',
		'base-300': 'hsl(0 0% 96%)',
		'base-content': '#000000',
	},
	dark: {
		'primary-header': '#FFC107',		// MD Amber 500
		'primary': '#FFCA28',						// MD Amber 400
		'secondary-header': '#E91E63',	// MD Pink 500
		'secondary': '#F06292',					// MD Pink 300
		'accent': '#26C6DA',						// MD Cyan 400
		'neutral': '#111111',
		'info': '#4FC3F7',							// MD Light Blue 300
		'success': '#AED581',						// MD Light Green 300
		'warning': '#FFD54F',						// MD Amber 300
		'error': '#E57373',							// MD Red 300
		'base-100': '#121212',
		'base-200': '#060606',
		'base-300': '#030303',
		'base-content': '#ffffff',
	},
} as ThemesConfigInterface;
