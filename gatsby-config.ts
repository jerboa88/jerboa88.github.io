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
		typesOutputPath: `src/common/gatsby-types.d.ts`,
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
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: [
					metadata.trackingId
				],
				gtagConfig: {
					// Opt-out of personalized advertising features
					anonymize_ip: true,
					allow_google_signals: false,
					allow_ad_personalization_signals: false
				},
				pluginConfig: {
					head: true
				}
			}
		},
		// {
		// 	resolve: 'gatsby-plugin-image-generator',
		// 	options: {
		// 		generate: [
		// 			configManager.getOgImage(),
		// 			...configManager.getIcons()
		// 		]
		// 	}
		// },
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: metadata.title,
				short_name: metadata.shortTitle,
				start_url: '/',
				background_color: darkTheme['base-100'],
				theme_color: darkTheme['primary'],
				display: 'standalone',
				icons: configManager.getIconManifestEntries(),
				// Favicon declarations and theme color meta tags are added to the document head manually using the SEO component (via Gatsby Head API)
				include_favicon: false,
				theme_color_in_head: false
			}
		},
		// This plugin needs to be listed after gatsby-plugin-manifest
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
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['Montserrat:900', 'Open Sans:400']
				}
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				'name': 'images',
				'path': './src/images/'
			},
			__key: 'images'
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
