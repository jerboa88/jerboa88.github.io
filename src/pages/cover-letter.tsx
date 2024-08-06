/*
	Cover letter page
	-----------------
*/

import { type HeadProps, type PageProps, graphql } from 'gatsby';
import { getSiteMetadata } from '../common/config-manager';
import { JSON_LD_AUTHOR_PATH } from '../common/constants';
import { getAbsoluteUrl } from '../common/utils';
import { DocumentPageLayout } from '../components/layout/document-page-layout';
import { Section } from '../components/layout/section';
import { PageHead } from '../components/seo/page-head';
import { Article } from '../components/text/article';
import { type SocialImagesMetadataProp, ThemeType } from '../types/other';
import type { CoverLetterPageContext } from '../types/page-context';

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
