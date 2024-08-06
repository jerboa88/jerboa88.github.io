/*
	Tailwind CSS configuration file
	-------------------------------
*/

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { getTheme } from './src/common/config-manager';
import { ThemeType } from './src/types/types';

export default {
	content: ['src/**/*.{js,jsx,ts,tsx}'],
	darkMode: ['class', `[data-theme="${ThemeType.Dark}"]`],
	theme: {
		fontFamily: {
			sans: [
				'Roboto Flex Variable',
				'Roboto Flex',
				'Roboto',
				'Tahoma',
				'Arial',
				'Helvetica',
				'sans-serif',
			],
		},
		transitionDuration: {
			// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by Tailwind CSS
			DEFAULT: '200ms',
		},
		extend: {
			backgroundImage: {
				glass:
					'radial-gradient(100% 100% at 50% 25%, oklch(var(--n)/.03), oklch(var(--b3)/.03))',
			},
			boxShadow: {
				emboss: 'inset 0 2px 1px 0 oklch(var(--n) / .2)',
				'emboss-none': 'inset 0 0 1px 0 oklch(var(--n) / .2)',
			},
			dropShadow: {
				emboss: '0 -2px 0 oklch(var(--n))',
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
		themes: [
			{ [ThemeType.Dark]: getTheme(ThemeType.Dark) },
			{ [ThemeType.Light]: getTheme(ThemeType.Light) },
		],
		darkTheme: ThemeType.Dark,
	},
} satisfies Config;
