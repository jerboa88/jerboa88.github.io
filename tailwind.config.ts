/*
	Tailwind CSS configuration file
	-------------------------------
*/

import plugin from 'tailwindcss/plugin';
import { getTheme } from './src/common/config-manager';

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			sans: [
				'Roboto Flex',
				'Roboto',
				'Tahoma',
				'Arial',
				'Helvetica',
				'sans-serif',
			],
		},
		transitionDuration: {
			DEFAULT: '200ms',
		},
		extend: {
			backgroundImage: {
				glass:
					'radial-gradient(100% 100% at 50% 25%, oklch(var(--n)/.03), oklch(var(--b3)/.03))',
			},
			fontFamily: {
				heading: [
					'Poppins',
					'Montserrat',
					'Impact',
					'Franklin Gothic Medium',
					'Candara',
					'Calibri',
					'sans-serif',
				],
				button: [
					'Poppins',
					'Inter Tight',
					'Roboto Condensed',
					'Arial Narrow',
					'Calibri',
					'Candara',
					'Impact',
					'sans-serif',
				],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
		plugin(({ addVariant }) => {
			addVariant('mouse-only', '@media (pointer: fine)');
		}),
	],
	daisyui: {
		themes: [{ dark: getTheme('dark') }, { light: getTheme('light') }],
		darkTheme: 'dark',
	},
};
