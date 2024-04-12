/*
	Tailwind CSS configuration file
	-------------------------------
*/


import plugin from 'tailwindcss/plugin';
import ConfigManager from './src/common/config-manager';


const configManager = new ConfigManager();


module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Roboto Flex', 'Roboto', 'Tahoma', 'Arial', 'Helvetica', 'sans-serif'],
		},
		transitionDuration: {
			DEFAULT: '150ms',
		},
		extend: {
			fontFamily: {
				heading: ['Poppins', 'Montserrat', 'Impact', 'Franklin Gothic Medium', 'Candara', 'Calibri', 'sans-serif'],
				button: ['Poppins', 'Inter Tight', 'Roboto Condensed', 'Arial Narrow', 'Calibri', 'Candara', 'Impact', 'sans-serif'],
			},
			colors: {
				'primary-header': 'var(--ph)',
				'secondary-header': 'var(--sh)',
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
		plugin(({ addVariant }) => {
			addVariant('mouse-only', '@media (pointer: fine)');
		}),
	],
	daisyui: {
		themes: [
			{ dark: configManager.getTheme('dark') },
			{ light: configManager.getTheme('light') },
		],
		darkTheme: 'dark',
	},
};
