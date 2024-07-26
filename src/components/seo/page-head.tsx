/*
	Custom head section for including meta tags on pages
	----------------------------------------------------
*/

import { getSiteMetadata, getTheme } from '../../common/config-manager';
import { JSON_LD_AUTHOR_PATH } from '../../common/constants';
import {
	type PageMetadataProp,
	type PropsWithClassName,
	SocialImageType,
	type SocialImagesMetadataProp,
	ThemeType,
} from '../../common/types';
import {
	getAbsoluteUrl,
	getClassNameProps,
	getMimeType,
} from '../../common/utils';

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
	const twitterImageUrl = getAbsoluteUrl(
		socialImagesMetadata[SocialImageType.Twitter].imagePath,
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
			<meta
				name="twitter:creator"
				content={SITE_METADATA.author.username.twitter}
			/>
			<meta name="twitter:description" content={pageMetadata.description} />
			<meta name="twitter:image" content={twitterImageUrl.toString()} />

			<meta name="google" content="nositelinkssearchbox" />
			<meta name="theme-color" content={THEME.primary} />

			<link rel="canonical" href={pageUrl.toString()} />

			{/* Structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'http://schema.org',
					...structuredData,
					author: {
						'@type': 'Person',
						'@id': JSON_LD_AUTHOR_PATH,
						name: SITE_METADATA.author.name.full,
						url: SITE_METADATA.siteUrl,
						image: SITE_METADATA.author.imageUrl,
						alumniOf: SITE_METADATA.author.alumniOf,
						jobTitle: SITE_METADATA.author.jobTitle,
						sameAs: [
							SITE_METADATA.author.url.linkedin,
							SITE_METADATA.author.url.github,
							SITE_METADATA.author.url.twitter,
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
