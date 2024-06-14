/*
	Gatsby configuration file
	-------------------------
*/

import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import {
	getSiteMetadata,
	getSocialImageGenerationConfigDefaults,
	getTheme,
} from './src/common/config-manager';
import { SOCIAL_IMAGES_DIR } from './src/common/constants';
import { getAbsoluteUrl } from './src/common/utilities';
import * as tailwindConfig from './tailwind.config';

const SITE_METADATA = getSiteMetadata();
const DARK_THEME = getTheme('dark');

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
		'gatsby-plugin-image',
		// Required by gatsby-plugin-image
		'gatsby-plugin-sharp',
		// Required by gatsby-plugin-image for dynamic images
		'gatsby-transformer-sharp',
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
				short_name: SITE_METADATA.shortTitle,
				start_url: '/',
				background_color: DARK_THEME['base-100'],
				theme_color: DARK_THEME.primary,
				display: 'standalone',
				icon: `${__dirname}/src/${SITE_METADATA.iconPath}`,
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
					Authorization: `Bearer ${process.env.GH_TOKEN}`,
				},
			},
		},
	],
};

export default config;
