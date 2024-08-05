/*
	Template used to generate the resume page
	-----------------------------------------
*/

import { type HeadProps, type PageProps, graphql } from 'gatsby';
import { useRef } from 'react';
import {
	getEducationRoles,
	getEmploymentRoles,
	getSiteMetadata,
	getVolunteeringRoles,
} from '../../common/config-manager';
import { JSON_LD_AUTHOR_PATH } from '../../common/constants';
import {
	type PageSection,
	type ResumePageContext,
	type SocialImagesMetadataProp,
	ThemeType,
} from '../../common/types';
import { getAbsoluteUrl, limit } from '../../common/utils';
import { DocumentPageLayout } from '../../components/layout/document-page-layout';
import { Section } from '../../components/layout/section';
import { ResumeProjectEntries } from '../../components/resume-project-entries';
import { ResumeRoleEntries } from '../../components/resume-role-entries';
import { PageHead } from '../../components/seo/page-head';
import { Article } from '../../components/text/article';

// Types

type PageContext = ResumePageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();
const EMPLOYMENT_ROLES = limit(getEmploymentRoles(), 1);
const EDUCATION_ROLES = limit(getEducationRoles(), 1);
const VOLUNTEERING_ROLES = limit(getVolunteeringRoles(), 1);

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ResumePageTemplate({
	data,
	pageContext: { projects },
}: PageProps<Queries.ResumePageQuery, PageContext>) {
	const sections = [
		{
			title: 'Summary',
			ref: useRef(null),
		},
		{
			title: 'Highlights',
			ref: useRef(null),
		},
		{
			title: 'Employment',
			ref: useRef(null),
		},
		{
			title: 'Education',
			ref: useRef(null),
		},
		{
			title: 'Volunteering',
			ref: useRef(null),
		},
		{
			title: 'Projects',
			ref: useRef(null),
		},
	] as PageSection[];
	const summaryHtml = data?.resumeSummary?.childMarkdownRemark?.html;
	const highlightsHtml = data?.resumeHighlights?.childMarkdownRemark?.html;

	return (
		<DocumentPageLayout numOfPages={2}>
			<Section
				{...sections[0]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				{summaryHtml && (
					<Article
						className="text-base-content prose-li:m-0"
						html={summaryHtml}
					/>
				)}
			</Section>
			<Section
				{...sections[1]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				{highlightsHtml && (
					<Article
						html={highlightsHtml}
						className="text-base-content prose-li:m-0"
					/>
				)}
			</Section>
			<Section
				{...sections[2]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeRoleEntries roles={EMPLOYMENT_ROLES} />
			</Section>
			<Section
				{...sections[3]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeRoleEntries roles={EDUCATION_ROLES} />
			</Section>
			<Section
				{...sections[4]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeRoleEntries roles={VOLUNTEERING_ROLES} />
			</Section>
			<Section
				{...sections[5]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeProjectEntries projects={projects} />
			</Section>
			<Section
				className="text-center font-bold"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<p className="text-base">References available upon request</p>
			</Section>
		</DocumentPageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { pageMetadata, socialImagesMetadata },
}: HeadProps<Queries.ResumePageQuery, PageContext>) => {
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

export const resumePageQuery = graphql`
  query ResumePage {
		resumeSummary: file(name: {eq: "resume-summary"}) {
			childMarkdownRemark {
				html
			}
		}
  	resumeHighlights: file(name: {eq: "resume-highlights"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`;
