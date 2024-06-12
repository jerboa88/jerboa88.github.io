/*
	Custom head section for including meta tags on pages
	----------------------------------------------------
*/


import React from 'react';
import { PageMetadata, SocialImagesMetadataProp } from '../../common/types';
import ConfigManager from '../../common/config-manager';
import { getAbsoluteUrl, getMimeType } from '../../common/utilities';


interface PageHeadPropsInterface extends SocialImagesMetadataProp {
	path: string;
	metadata: PageMetadata;
	structuredData: object;
}

export default function PageHead({ path, metadata, structuredData, socialImagesMetadata }: PageHeadPropsInterface) {
	// Grab site metadata from Gatsby config
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getSiteMetadata();

	// TODO: Replace hardcoded value
	const theme = configManager.getTheme('dark');
	const primaryThemeColor = theme.primary;

	const pageUrl = getAbsoluteUrl(path);
	const ogImageUrl = getAbsoluteUrl(socialImagesMetadata.og.imagePath);
	const twitterImageUrl = getAbsoluteUrl(socialImagesMetadata.twitter.imagePath);

	return (
		<>
			<html lang="en-US" />
			<title>{metadata.title}</title>
			<meta name="author" content={siteMetadata.author.name.full} />
			<meta name="description" content={metadata.description} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* OpenGraph meta tags */}
			<meta property="og:title" content={metadata.title} />
			<meta property="og:description" content={metadata.description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pageUrl.toString()} />
			<meta property="og:image" content={ogImageUrl.toString()} />
			<meta property="og:image:type" content={getMimeType(ogImageUrl)} />
			<meta property="og:image:width" content={socialImagesMetadata.og.size.width.toString()} />
			<meta property="og:image:height" content={socialImagesMetadata.og.size.height.toString()} />

			{/* Twitter meta tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={metadata.title} />
			<meta name="twitter:creator" content={siteMetadata.author.username.twitter} />
			<meta name="twitter:description" content={metadata.description} />
			<meta name="twitter:image" content={twitterImageUrl.toString()} />

			<meta name="google" content="nositelinkssearchbox" />
			<meta content={primaryThemeColor} name="theme-color" />

			<link rel="canonical" href={pageUrl.toString()} />

			{/* Structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'http://schema.org',
					// TODO: This doesn't work correctly for lists
					...structuredData,
					author: {
						'@type': 'Person',
						name: siteMetadata.author.name.full,
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
