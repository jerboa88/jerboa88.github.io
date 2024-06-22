/*
	Gatsby configuration file
	-------------------------
*/

import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import {
	getSiteMetadata,
	getSocialImageGenerationConfigDefaults,
	getSocialImageGenerationConfigForType,
	getTheme,
} from './src/common/config-manager';
import { SOCIAL_IMAGES_DIR } from './src/common/constants';
import { getAbsoluteUrl } from './src/common/utilities';
import tailwindConfig from './tailwind.config';

const SITE_METADATA = getSiteMetadata();
const DARK_THEME = getTheme('dark');
const OG_IMAGE_GENERATION_CONFIG = getSocialImageGenerationConfigForType('og');

// Load environment variables from relevant .env file
dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
	siteMetadata: SITE_METADATA,
	// Enable the new JSX transform so that we can use JSX without importing React
	jsxRuntime: 'automatic',
	graphqlTypegen: {
		typesOutputPath: 'src/common/gatsby-types.d.ts',
	},
	plugins: [
		'gatsby-plugin-fontawesome',
		{
			resolve: 'gatsby-plugin-component-to-image',
			options: getSocialImageGenerationConfigDefaults(),
		},
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: [
					require('tailwindcss')(tailwindConfig),
					require('autoprefixer'),
				],
			},
		},
		// This plugin needs to be listed after gatsby-plugin-postcss so that it can purge unused CSS
		{
			resolve: 'gatsby-plugin-purgecss',
			options: {
				tailwind: true,
				purgeCSSOptions: {
					safelist: [/where/],
				},
			},
		},
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				// The sitemap index will be generated at /sitemap-index.xml
				output: '/',
				serialize: ({ path }: { path: string }) => ({
					url: path,
					changefreq: 'monthly',
				}),
				// Prevent temporary components rendered by gatsby-plugin-open-graph-images from being included in the sitemap
				excludes: [`/${SOCIAL_IMAGES_DIR}/**/*`],
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				// Link to the sitemap index generated above
				sitemap: getAbsoluteUrl('sitemap-index.xml').toString(),
				policy: [
					{
						userAgent: '*',
						allow: '/',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: SITE_METADATA.title,
				description: SITE_METADATA.description,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				short_name: SITE_METADATA.shortTitle,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				start_url: '/',
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				background_color: DARK_THEME['base-100'],
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				theme_color: DARK_THEME.primary,
				display: 'standalone',
				icon: `${__dirname}/src/${SITE_METADATA.iconPath}`,
				screenshots: [
					{
						src: 'images/og/index.webp',
						sizes: `${OG_IMAGE_GENERATION_CONFIG.size.width}x${OG_IMAGE_GENERATION_CONFIG.size.height}`,
						type: 'image/webp',
					},
				],
				crossOrigin: 'use-credentials',
			},
		},
		// This plugin needs to be listed after gatsby-plugin-manifest so that it can cache the generated manifest.webmanifest
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'content',
				path: `${__dirname}/src/content/`,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-autolink-headers',
						options: {
							isIconAfterHeader: true,
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'GITHUB',
				fieldName: 'github',
				url: 'https://api.github.com/graphql',
				headers: {
					authorization: `Bearer ${process.env.GH_TOKEN}`,
				},
			},
		},
	],
};

// biome-ignore lint/style/noDefaultExport: Gatsby config must use default exports
export default config;
