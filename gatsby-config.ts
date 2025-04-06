/*
	Gatsby configuration file
	-------------------------
*/

import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import {
	COVER_LETTER_PATH,
	INDEX_PATH,
	PROJECT_METADATA_PATH,
	PROJECT_README_PATH,
	SOCIAL_IMAGES_PATH,
} from './src/config/constants.ts';
import {
	getSiteMetadata,
	getSocialImageGenerationConfigDefaults,
	getSocialImageGenerationConfigForType,
	getTheme,
} from './src/managers/config.ts';
import { SocialImageType, ThemeType } from './src/types/other.ts';
import { getAbsoluteUrl } from './src/utils/urls.ts';
import tailwindConfig from './tailwind.config';

const SITE_METADATA = getSiteMetadata();
const DARK_THEME = getTheme(ThemeType.Dark);
const OG_IMAGE_GENERATION_CONFIG = getSocialImageGenerationConfigForType(
	SocialImageType.OpenGraph,
);

// Load environment variables from relevant .env file
dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
	siteMetadata: SITE_METADATA,
	// Enable the new JSX transform so that we can use JSX without importing React
	jsxRuntime: 'automatic',
	trailingSlash: 'never',
	graphqlTypegen: {
		typesOutputPath: 'src/types/gatsby-types.d.ts',
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
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				purgeCSSOptions: {
					safelist: [/where/, /data-theme/],
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
				excludes: [`/${SOCIAL_IMAGES_PATH}/**/*`, COVER_LETTER_PATH],
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
				start_url: INDEX_PATH,
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
			resolve: 'gatsby-source-github-api',
			options: {
				token: process.env.GH_TOKEN,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				graphQLQuery: `
					query ($projectMetadataPath: String, $readmePath: String, $author: String = "", $repoLimit: Int = 0, $topicLimit: Int = 0, $languageLimit: Int = 0) {
						user(login: $author) {
							repositories(first: $repoLimit, orderBy: {field: STARGAZERS, direction: DESC}) {
								nodes {
									createdAt
									description
									forkCount
									homepageUrl
									isFork
									languages(first: $languageLimit) {
										nodes {
											name
										}
									}
									licenseInfo {
										spdxId
										name
										url
									}
									projectMetadata: object(expression: $projectMetadataPath) {
										... on Blob {
											text
										}
									}
									name
									openGraphImageUrl
									owner {
										login
									}
									readme: object(expression: $readmePath) {
										... on Blob {
											text
										}
									}
									repositoryTopics(first: $topicLimit) {
										nodes {
											topic {
												name
											}
										}
									}
									stargazerCount
									updatedAt
									url
									usesCustomOpenGraphImage
								}
							}
						}
					}
				`,
				variables: {
					// Required
					author: SITE_METADATA.author.username.github,
					projectMetadataPath: `HEAD:${PROJECT_METADATA_PATH}`,
					readmePath: `HEAD:${PROJECT_README_PATH}`,
					// Optional
					repoLimit: 100,
					topicLimit: 20,
					languageLimit: 6,
				},
			},
		},
		{
			resolve: 'gatsby-plugin-meta-redirect',
			options: {
				// We are using a fork of gatsby-plugin-meta-redirect that supports disabling trailing slashes
				disableTrailingSlash: true,
			},
		},
	],
};

// biome-ignore lint/style/noDefaultExport: Gatsby config must use default exports
export default config;
