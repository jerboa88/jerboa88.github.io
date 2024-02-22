/*
	Custom head section for meta tags
	---------------------------------
*/


import React from 'react';
import ConfigManager from '../../common/config-manager';

interface SEOPropsInterface {
	pageMetadata: {
		title: string;
		description: string;
		shortDescription: string;
		path: string;
		ogImageUrl: string;
		ogImageAltText: string;
		structuredData: object;
	}
}

export default function SEO({ pageMetadata }: SEOPropsInterface) {
	// Grab site metadata from Gatsby config
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();

	// TODO: Replace hardcoded value
	const theme = configManager.getTheme('dark');
	const primaryThemeColor = theme.primary;
	const pageUrl = new URL(pageMetadata.path, siteMetadata.siteUrl).toString();


	return (
		<>
			<html lang="en-US" />
			<title>{pageMetadata.title}</title>
			<meta name="author" content={siteMetadata.author.name} />
			<meta name="description" content={pageMetadata.description} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* OpenGraph meta tags */}
			<meta property="og:title" content={pageMetadata.title} />
			<meta property="og:description" content={pageMetadata.description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pageUrl} />
			<meta property="og:image" content={pageMetadata.ogImageUrl} />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={pageMetadata.ogImageAltText} />

			{/* Twitter meta tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={pageMetadata.title} />
			<meta name="twitter:creator" content={siteMetadata.author.username.twitter} />
			<meta name="twitter:description" content={pageMetadata.description} />
			<meta name="twitter:image" content={pageMetadata.ogImageUrl} />
			<meta name="twitter:image:alt" content={pageMetadata.ogImageAltText} />

			<meta name="google" content="nositelinkssearchbox" />
			<meta content={primaryThemeColor} name="theme-color" />

			<link rel="canonical" href={pageUrl} />

			{/* These icons are were not added to the head with gatsby-plugin-manifest so we need to add them manually here */}
			<link rel="icon" href="/favicon-32x32.png" type="image/png" />
			<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

			{/* Structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'http://schema.org',
					...pageMetadata.structuredData,
					author: {
						'@type': 'Person',
						name: siteMetadata.author.name,
						url: siteMetadata.siteUrl,
						image: siteMetadata.author.image,
						alumniOf: siteMetadata.author.alumniOf,
						jobTitle: siteMetadata.author.jobTitle,
						sameAs: [
							siteMetadata.author.link.linkedin,
							siteMetadata.author.link.github,
							siteMetadata.author.link.twitter,
						],
						address: {
							'@type': 'PostalAddress',
							addressLocality: siteMetadata.author.location.city,
							addressRegion: siteMetadata.author.location.state,
							addressCountry: siteMetadata.author.location.country,
						},
					}
				})}
			</script>
		</>
	)
}
