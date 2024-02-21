/*
	Custom head section for meta tags
	---------------------------------
*/


import React from 'react';
import ConfigManager from '../../common/config-manager';


// Return a formatted title and short title for the page
function getTitles(pageTitle: string | undefined, siteTitle: string, siteShortTitle: string): { title: string, shortTitle: string } {
	return {
		title: pageTitle ? `${pageTitle} | ${siteShortTitle}` : siteTitle,
		shortTitle: pageTitle || siteShortTitle,
	}
}


// Returns formatted descriptions for the page
function getDescriptions(pageDescription: string | undefined, pageShortDescription: string | undefined, siteDescription: string, siteShortDescription: string): { description: string, shortDescription: string } {
	return {
		description: pageDescription || pageShortDescription || siteShortDescription || siteDescription,
		shortDescription: pageShortDescription || pageDescription || siteShortDescription || siteDescription,
	}
}


interface SEOPropsInterface {
	pageMetadata?: {
		title: string;
		description: string;
		shortDescription?: string;
		path: string;
		ogImageUrl: string;
		ogImageAltText: string;
	}
}

export default function SEO({ pageMetadata }: SEOPropsInterface) {
	// Grab site metadata from Gatsby config
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();

	// TODO: Replace hardcoded value
	const theme = configManager.getTheme('dark');
	const primaryThemeColor = theme.primary;

	// Page constants
	const { author, siteUrl } = siteMetadata;

	// Use site metadata if no page-specific metadata is provided
	const pageUrl = new URL(pageMetadata?.path || '', siteUrl).toString();
	const { title, shortTitle } = getTitles(
		pageMetadata?.title,
		siteMetadata.title,
		siteMetadata.shortTitle
	);
	const { description, shortDescription } = getDescriptions(
		pageMetadata?.description,
		pageMetadata?.shortDescription,
		siteMetadata.description,
		siteMetadata.shortDescription
	);
	const ogImageUrl = pageMetadata?.ogImageUrl || new URL(siteMetadata.ogImagePath, siteMetadata.siteUrl).toString();
	const ogImageAltText = pageMetadata?.ogImageAltText || siteMetadata.ogImageAltText;

	return (
		<>
			<html lang="en-US" />
			<title>{title}</title>
			<meta name="author" content={author.fullName} />
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* OpenGraph meta tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pageUrl} />
			<meta property="og:image" content={ogImageUrl} />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={ogImageAltText} />

			{/* Twitter meta tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:creator" content={author.username.twitter} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImageUrl} />
			<meta name="twitter:image:alt" content={ogImageAltText} />

			<meta name="google" content="nositelinkssearchbox" />
			<meta content={primaryThemeColor} name="theme-color" />

			<link rel="canonical" href={pageUrl} />

			{/* These icons are were not added to the head with gatsby-plugin-manifest so we need to add them manually here */}
			<link rel="icon" href="/favicon-32x32.png" type="image/png" />
			<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

			{/* Structured data */}
			{/* TODO: This should be customized per page */}
			{/* <script type="application/ld+json">
				{
					`{
						"@context": "http://schema.org",
						"@type": "WebSite",
						"name": "${title}",
						"description": "${description}",
						// "url": "${pageUrl}",
						"author": {
							"@type": "Person",
							"name": "${author}",
							"url": "${siteUrl}"
						}
					}`
				}
			</script> */}
		</>
	)
}
