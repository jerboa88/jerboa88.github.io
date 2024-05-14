/*
	Custom 404 page
	---------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../common/config-manager';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import PageHead from '../components/seo/page-head';
import SolidButtonLink from '../components/links/solid-button-link';


// Constants

const PAGE_TITLE = '404 - Page Not Found';
const SITE_METADATA = new ConfigManager().getMetadata();


export default function NotFoundPage() {
	// Cat ASCII art from https://emojicombos.com/cat
	const sadCat = [
		'         \uFF0F\uFF1E\u3000\u0020\u30D5',
		'         \u007C\u0020\u3000\u005F\u3000\u005F\u007C',
		'       \uFF0F\u0060\u0020\u30DF\uFF3F\u0078\u30CE',
		'      \u002F\u3000\u3000\u3000\u3000\u0020\u007C',
		'     \u002F\u3000\u0020\u30FD\u3000\u3000\u0020\uFF89',
		'    \u2502\u3000\u3000\u007C\u3000\u007C\u3000\u007C',
		'\uFF0F\uFFE3\u007C\u3000\u3000\u0020\u007C\u3000\u007C\u3000\u007C',
		'\u0028\uFFE3\u30FD\uFF3F\u005F\u30FD\u005F\u0029\u005F\u005F\u0029',
		'\uFF3C\u4E8C\u0029',
	].join('\n');

	return (
		<PageLayout siteMetadata={SITE_METADATA}>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title="404" ref={useRef(null)} className="items-center">
				<div className="flex flex-col gap-8 items-center">
					Oof, there's nothing here
					<figure className="flex justify-center flex-column">
						<pre role="img" aria-label="ASCII Sad Cat" aria-description="ASCII art of a sad cat, sitting down" className="leading-normal text-left" >
							{sadCat}
						</pre>
					</figure>
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location }: HeadProps) => {
	const pageMetadata = {
		title: `${PAGE_TITLE} | ${SITE_METADATA.shortTitle}`,
		description: SITE_METADATA.description,
		shortDescription: SITE_METADATA.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(SITE_METADATA.ogImagePath, SITE_METADATA.siteUrl).toString(),
		ogImageAltText: SITE_METADATA.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: PAGE_TITLE,
			description: SITE_METADATA.description,
			url: SITE_METADATA.siteUrl,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
	);
}
