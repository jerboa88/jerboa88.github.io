/*
	Gatsby configuration file
	-------------------------
*/


import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';
import * as tailwindConfig from './tailwind.config';
import ConfigManager from './src/common/config-manager';
import { OG_IMAGE_DIR } from './src/common/constants';


const configManager = new ConfigManager();
const metadata = configManager.getSiteMetadata();
const lightTheme = configManager.getTheme('light');
const darkTheme = configManager.getTheme('dark');


// Load environment variables from relevant .env file
dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});


const config: GatsbyConfig = {
	siteMetadata: {
		...metadata,
		lightTheme,
		darkTheme
	},
	graphqlTypegen: {
		typesOutputPath: 'src/common/gatsby-types.d.ts',
	},
	plugins: [
		'gatsby-plugin-image',
		// Required by gatsby-plugin-image
		'gatsby-plugin-sharp',
		// Required by gatsby-plugin-image for dynamic images
		'gatsby-transformer-sharp',
		'gatsby-plugin-dynamic-open-graph-images',
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
				excludes: [`/${OG_IMAGE_DIR}/*`],
			}
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				// Link to the sitemap index generated above
				sitemap: new URL('sitemap-index.xml', metadata.siteUrl).toString(),
				policy: [
					{
						userAgent: '*',
						allow: '/',
					}
				]
			}
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: metadata.title,
				short_name: metadata.shortTitle,
				start_url: '/',
				background_color: darkTheme['base-100'],
				theme_color: darkTheme['primary'],
				display: 'standalone',
				icon: `${__dirname}/src/${metadata.iconPath}`,
				crossOrigin: 'use-credentials',
			}
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
	]
};

export default config;
