/*
	Privacy Policy page
	-------------------
*/

import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { useRef } from 'react';
import { getSiteMetadata } from '../common/config-manager.ts';
import { JSON_LD_AUTHOR_PATH } from '../common/constants.ts';
import { getAbsoluteUrl } from '../common/utils/urls.ts';
import { PageLayout } from '../components/layout/page-layout.tsx';
import { Section } from '../components/layout/section.tsx';
import { SolidButtonLink } from '../components/links/solid-button-link.tsx';
import { PageHead } from '../components/seo/page-head.tsx';
import { Article } from '../components/text/article.tsx';
import type { SocialImagesMetadataProp } from '../types/other.ts';
import type { PrivacyPageContext } from '../types/page-context.ts';

// Types

type PageContext = PrivacyPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// biome-ignore lint/style/noDefaultExport: Pages must use default exports
export default function PrivacyPolicyPage({
	data,
	pageContext: { pageMetadata },
}: PageProps<Queries.PrivacyPolicyPageQuery, PageContext>) {
	const articleHtml = data?.file?.childMarkdownRemark?.html;
	const sectionRef = useRef<HTMLElement>(null);

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={pageMetadata.title}
				ref={sectionRef}
				className="items-center"
			>
				<div className="flex flex-col gap-8 items-center">
					{articleHtml && <Article html={articleHtml} />}
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { pageMetadata, socialImagesMetadata },
}: HeadProps<Queries.PrivacyPolicyPageQuery, PageContext>) => {
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
				'@id': JSON_LD_AUTHOR_PATH,
			},
		},
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ pageMetadata: metadata, structuredData, socialImagesMetadata }}
		/>
	);
};

export const privacyPolicyPageQuery = graphql`
  query PrivacyPolicyPage {
		file(name: {eq: "privacy-policy"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`;
