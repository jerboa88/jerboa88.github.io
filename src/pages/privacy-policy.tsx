/*
	Privacy Policy page
	-------------------
*/

import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { useCallback, useRef } from 'react';
import { PageLayout } from '../components/layout/page-layout.tsx';
import { Section } from '../components/layout/section.tsx';
import { GhostButtonLink } from '../components/links/ghost-button-link.tsx';
import { PageHead } from '../components/seo/page-head.tsx';
import { Article } from '../components/text/article.tsx';
import { AUTHOR_SCHEMA_PATH } from '../config/constants.ts';
import { getSiteMetadata } from '../managers/config.ts';
import type { ButtonElementRenderFn } from '../types/components.ts';
import type { SocialImagesMetadataProp } from '../types/other.ts';
import type { PrivacyPageContext } from '../types/page-context.ts';
import { getAbsoluteUrl } from '../utils/urls.ts';

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
	const sectionButton = useCallback(
		((remainingProps) => (
			<GhostButtonLink
				text="Home"
				icon={faIgloo}
				to="/"
				responsive
				isInternal
				{...remainingProps}
			/>
		)) as ButtonElementRenderFn,
		[],
	);

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={pageMetadata.title}
				ref={sectionRef}
				renderButton={sectionButton}
				className="items-center"
			>
				<div className="flex flex-col gap-8 items-center">
					{articleHtml && <Article html={articleHtml} />}
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
				'@id': AUTHOR_SCHEMA_PATH,
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
