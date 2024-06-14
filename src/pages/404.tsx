/*
	Custom 404 page
	---------------
*/

import type { HeadProps, PageProps } from 'gatsby';
import { useRef } from 'react';
import { getSiteMetadata } from '../common/config-manager';
import type {
	PageMetadataProp,
	SocialImagesMetadataProp,
} from '../common/types';
import { getAbsoluteUrl } from '../common/utilities';
import PageLayout from '../components/layout/page-layout';
import Section from '../components/layout/section';
import SolidButtonLink from '../components/links/solid-button-link';
import PageHead from '../components/seo/page-head';

// Types

interface PageContext {
	pageContext: PageMetadataProp & SocialImagesMetadataProp;
}

// Constants

const SITE_METADATA = getSiteMetadata();

export default function NotFoundPage({
	pageContext: { pageMetadata },
}: PageContext & PageProps) {
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
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={pageMetadata.shortTitle}
				ref={useRef(null)}
				className="items-center"
			>
				<div className="flex flex-col gap-8 items-center">
					Oof, there's nothing here
					<figure className="flex justify-center flex-column">
						<pre
							role="img"
							aria-label="ASCII Sad Cat"
							aria-description="ASCII art of a sad cat, sitting down"
							className="leading-normal text-left"
						>
							{sadCat}
						</pre>
					</figure>
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { pageMetadata, socialImagesMetadata },
}: PageContext & HeadProps) => {
	const pageTitle = `${pageMetadata.title} | ${SITE_METADATA.shortTitle}`;
	const metadata = {
		title: pageTitle,
		shortTitle: pageMetadata.shortTitle,
		description: pageMetadata.description,
	};
	const structuredData = {
		'@type': 'WebPage',
		name: pageTitle,
		description: pageMetadata.description,
		url: getAbsoluteUrl(location.pathname),
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ metadata, structuredData, socialImagesMetadata }}
		/>
	);
};
