/*
	Privacy Policy page
	-------------------
*/

import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { useRef } from 'react';
import { getSiteMetadata } from '../common/config-manager';
import type {
	PageMetadataProp,
	SocialImagesMetadataProp,
} from '../common/types';
import { getAbsoluteUrl } from '../common/utils';
import { PageLayout } from '../components/layout/page-layout';
import { Section } from '../components/layout/section';
import { SolidButtonLink } from '../components/links/solid-button-link';
import { PageHead } from '../components/seo/page-head';
import { Article } from '../components/text/article';

// Types

interface PageContextProp {
	pageContext: PageMetadataProp & SocialImagesMetadataProp;
}

interface DataProp {
	data: {
		file: {
			childMarkdownRemark: {
				html: string;
			};
		};
	};
}

// Constants

const SITE_METADATA = getSiteMetadata();

// biome-ignore lint/style/noDefaultExport: Pages must use default exports
export default function PrivacyPolicyPage({
	data,
	pageContext: { pageMetadata },
}: PageContextProp & DataProp & PageProps) {
	const articleHtml = data.file.childMarkdownRemark.html;

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={pageMetadata.title}
				ref={useRef(null)}
				className="items-center"
			>
				<div className="flex flex-col gap-8 items-center">
					<Article html={articleHtml} />
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { pageMetadata, socialImagesMetadata },
}: PageContextProp & DataProp & HeadProps) => {
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
		mainEntity: {
			'@type': 'Article',
			headline: pageMetadata.shortTitle,
			description: pageMetadata.description,
			author: {
				'@id': '/author',
			},
		},
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ metadata, structuredData, socialImagesMetadata }}
		/>
	);
};

export const pageQuery = graphql`
  query PrivacyPolicyPage {
		file(name: {eq: "privacy-policy"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`;
