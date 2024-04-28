/*
	Gatsby configuration file
	-------------------------
*/


import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';
import ConfigManager from './src/common/config-manager';
import * as tailwindConfig from './tailwind.config';


const configManager = new ConfigManager();
const metadata = configManager.getMetadata();
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
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: [
					require('tailwindcss')(tailwindConfig),
					require('autoprefixer')
				],
			},
		},
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				// Generate sitemaps at the root of the site
				output: '/',
				serialize: ({ path }: { path: string }) => {
					return {
						url: path,
						changefreq: 'monthly'
					}
				},
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
						allow: '/'
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
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.svg$/
				}
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				'name': 'images',
				'path': `${__dirname}/src/images/`
			},
			__key: 'images'
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'content',
				path: `${__dirname}/src/content`,
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
		}
	]
};

export default config;
