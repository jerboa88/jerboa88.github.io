/*
	Cover letter page
	-----------------
*/

import { type HeadProps, type PageProps, graphql } from 'gatsby';
import { DocumentPageLayout } from '../components/layout/document-page-layout.tsx';
import { Section } from '../components/layout/section.tsx';
import { PageHead } from '../components/seo/page-head.tsx';
import { Article } from '../components/text/article.tsx';
import { JSON_LD_AUTHOR_PATH } from '../config/constants.ts';
import { getSiteMetadata } from '../managers/config.ts';
import { type SocialImagesMetadataProp, ThemeType } from '../types/other.ts';
import type { CoverLetterPageContext } from '../types/page-context.ts';
import { getAbsoluteUrl } from '../utils/urls.ts';

// Types

type PageContext = CoverLetterPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function CoverLetterPage({
	data,
}: PageProps<Queries.CoverLetterPageQuery, PageContext>) {
	const coverLetterHtml = data?.file?.childMarkdownRemark?.html;

	if (!coverLetterHtml) {
		return null;
	}

	return (
		<DocumentPageLayout numOfPages={1}>
			<Section responsive={false}>
				<Article html={coverLetterHtml} />
			</Section>
			<Section responsive={false} />
		</DocumentPageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { pageMetadata, socialImagesMetadata },
}: HeadProps<Queries.CoverLetterPageQuery, PageContext>) => {
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
			'@type': 'TextDigitalDocument',
			name: pageMetadata.shortTitle,
			description: pageMetadata.description,
			author: {
				'@id': JSON_LD_AUTHOR_PATH,
			},
			hasDigitalDocumentPermission: [
				{
					'@type': 'DigitalDocumentPermission',
					permissionType: 'https://schema.org/WritePermission',
					grantee: {
						'@id': JSON_LD_AUTHOR_PATH,
					},
				},
				{
					'@type': 'DigitalDocumentPermission',
					permissionType: 'https://schema.org/ReadPermission',
					grantee: {
						'@type': 'Audience',
						audienceType: 'public',
					},
				},
			],
		},
	};

	return (
		<PageHead
			path={location.pathname}
			theme={ThemeType.Light}
			className="bg-base-100"
			{...{ pageMetadata: metadata, structuredData, socialImagesMetadata }}
		/>
	);
};

export const coverLetterPageQuery = graphql`
  query CoverLetterPage {
		file(name: {eq: "cover-letter"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`;
