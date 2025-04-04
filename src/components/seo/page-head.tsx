/*
	Custom head section for including meta tags on pages
	----------------------------------------------------
*/

import { AUTHOR_SCHEMA_PATH } from '../../config/constants.ts';
import { getSiteMetadata, getTheme } from '../../managers/config.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import {
	type PageMetadataProp,
	SocialImageType,
	type SocialImagesMetadataProp,
	ThemeType,
} from '../../types/other.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { getAbsoluteUrl, getMimeType } from '../../utils/urls.ts';

// Types

interface Props
	extends PropsWithClassName,
		PageMetadataProp,
		SocialImagesMetadataProp {
	path: string;
	structuredData: object;
	theme?: ThemeType;
}

// Constants

const SITE_METADATA = getSiteMetadata();
// TODO: Replace hardcoded value
const THEME = getTheme(ThemeType.Dark);

export function PageHead({
	className,
	path,
	pageMetadata,
	structuredData,
	socialImagesMetadata,
	theme = ThemeType.Dark,
}: Props) {
	const classNameProps = getClassNameProps('print:text-xs/none', className);
	const pageUrl = getAbsoluteUrl(path);
	const ogImageUrl = getAbsoluteUrl(
		socialImagesMetadata[SocialImageType.OpenGraph].imagePath,
	);
	const xImageUrl = getAbsoluteUrl(
		socialImagesMetadata[SocialImageType.X].imagePath,
	);

	return (
		<>
			<html lang="en-US" data-theme={theme} {...classNameProps} />
			<body {...classNameProps} />
			<title>{pageMetadata.title}</title>
			<meta name="author" content={SITE_METADATA.author.name.full} />
			<meta name="description" content={pageMetadata.description} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* OpenGraph meta tags */}
			<meta property="og:title" content={pageMetadata.title} />
			<meta property="og:description" content={pageMetadata.description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pageUrl.toString()} />
			<meta property="og:image" content={ogImageUrl.toString()} />
			<meta property="og:image:type" content={getMimeType(ogImageUrl)} />
			<meta
				property="og:image:width"
				content={socialImagesMetadata[
					SocialImageType.OpenGraph
				].size.width.toString()}
			/>
			<meta
				property="og:image:height"
				content={socialImagesMetadata[
					SocialImageType.OpenGraph
				].size.height.toString()}
			/>

			{/* Twitter meta tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={pageMetadata.title} />
			<meta name="twitter:creator" content={SITE_METADATA.author.username.x} />
			<meta name="twitter:description" content={pageMetadata.description} />
			<meta name="twitter:image" content={xImageUrl.toString()} />

			<meta name="google" content="nositelinkssearchbox" />
			{THEME.primary && <meta name="theme-color" content={THEME.primary} />}

			<link rel="canonical" href={pageUrl.toString()} />

			{/* Structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'http://schema.org',
					...structuredData,
					author: {
						'@type': 'Person',
						'@id': AUTHOR_SCHEMA_PATH,
						name: SITE_METADATA.author.name.full,
						url: SITE_METADATA.siteUrl,
						image: SITE_METADATA.author.imageUrl,
						alumniOf: SITE_METADATA.author.alumniOf,
						jobTitle: SITE_METADATA.author.jobTitle,
						sameAs: [
							SITE_METADATA.author.url.linkedin,
							SITE_METADATA.author.url.github,
							SITE_METADATA.author.url.x,
						],
						address: {
							'@type': 'PostalAddress',
							addressLocality: SITE_METADATA.author.location.city,
							addressRegion: SITE_METADATA.author.location.state,
							addressCountry: SITE_METADATA.author.location.country,
						},
					},
				})}
			</script>
		</>
	);
}
