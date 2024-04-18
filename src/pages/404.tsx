/*
	Custom 404 page
	---------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../common/config-manager';
import { SectionInterface } from '../common/types';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import SolidButtonLink from '../components/links/solid-button-link';


export default function NotFoundPage() {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const section = {
		id: '404',
		title: '404',
		ref: useRef(null),
	} as SectionInterface;
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
		<PageLayout siteMetadata={siteMetadata}>
			{/* Dummy element to force center alignment of section */}
			<div></div>
			<Section className="items-center" {...section}>
				<div className="flex flex-col items-center gap-8">
					Oof, there's nothing here
					<figure className="flex flex-column justify-center">
						<pre className="text-left leading-normal" role="img" aria-label="ASCII Sad Cat" aria-description="ASCII art of a sad cat, sitting down">
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
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const pageTitle = '404 - Page Not Found';
	const pageMetadata = {
		title: `${pageTitle} | ${siteMetadata.shortTitle}`,
		description: siteMetadata.description,
		shortDescription: siteMetadata.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(siteMetadata.ogImagePath, siteMetadata.siteUrl).toString(),
		ogImageAltText: siteMetadata.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: pageTitle,
			description: siteMetadata.description,
			url: siteMetadata.siteUrl,
		}
	};

	return (
		<SEO pageMetadata={pageMetadata} />
	);
}
