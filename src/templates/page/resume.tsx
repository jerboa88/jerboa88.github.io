/*
	Template used to generate the resume page
	-----------------------------------------
*/

import { type HeadProps, type PageProps, graphql } from 'gatsby';
import { useRef } from 'react';
import { getSiteMetadata } from '../../common/config-manager.ts';
import { JSON_LD_AUTHOR_PATH, RESUME_PATH } from '../../common/constants.ts';
import {
	getRolesForPage,
	getSkillsForPage,
} from '../../common/content-manager.ts';
import { getAbsoluteUrl } from '../../common/utils/urls.ts';
import { DocumentPageLayout } from '../../components/layout/document-page-layout.tsx';
import { Section } from '../../components/layout/section.tsx';
import { ResumeProjectEntries } from '../../components/resume/project-entries.tsx';
import { ResumeRoleEntries } from '../../components/resume/role-entries.tsx';
import { ResumeSkillEntries } from '../../components/resume/skill-entries.tsx';
import { PageHead } from '../../components/seo/page-head.tsx';
import { Article } from '../../components/text/article.tsx';
import { type SocialImagesMetadataProp, ThemeType } from '../../types/other.ts';
import type { ResumePageContext } from '../../types/page-context.ts';

// Types

type PageContext = ResumePageContext & SocialImagesMetadataProp;

// Constants

const COMMON_SECTION_PROPS = {
	sectionHeaderClassName: 'text-primary',
	dividerClassName: '!pb-4',
	responsive: false,
};
const SITE_METADATA = getSiteMetadata();
const ROLES = getRolesForPage(RESUME_PATH);
const SKILLS = getSkillsForPage(RESUME_PATH);

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ResumePageTemplate({
	data,
	pageContext: { projects },
}: PageProps<Queries.ResumePageQuery, PageContext>) {
	const sectionProps = {
		summary: {
			title: 'Summary',
			ref: useRef(null),
		},
		highlights: {
			title: 'Highlights',
			ref: useRef(null),
		},
		employment: {
			title: 'Employment',
			ref: useRef(null),
		},
		education: {
			title: 'Education',
			ref: useRef(null),
		},
		volunteering: {
			title: 'Volunteering',
			ref: useRef(null),
		},
		skills: {
			title: 'Skills',
			ref: useRef(null),
		},
		projects: {
			title: 'Projects',
			ref: useRef(null),
		},
	};

	const summaryHtml = data?.resumeSummary?.childMarkdownRemark?.html;
	const highlightsHtml = data?.resumeHighlights?.childMarkdownRemark?.html;

	return (
		<DocumentPageLayout>
			{summaryHtml && (
				<Section {...sectionProps.summary} {...COMMON_SECTION_PROPS}>
					<Article
						className="text-base-content prose-li:m-0"
						html={summaryHtml}
					/>
				</Section>
			)}
			{highlightsHtml && (
				<Section {...sectionProps.highlights} {...COMMON_SECTION_PROPS}>
					<Article
						html={highlightsHtml}
						className="text-base-content prose-li:m-0"
					/>
				</Section>
			)}
			{ROLES.employment.length > 0 && (
				<Section {...sectionProps.employment} {...COMMON_SECTION_PROPS}>
					<ResumeRoleEntries roles={ROLES.employment} />
				</Section>
			)}
			{ROLES.education.length > 0 && (
				<Section {...sectionProps.education} {...COMMON_SECTION_PROPS}>
					<ResumeRoleEntries roles={ROLES.education} />
				</Section>
			)}
			{ROLES.volunteering.length > 0 && (
				<Section {...sectionProps.volunteering} {...COMMON_SECTION_PROPS}>
					<ResumeRoleEntries roles={ROLES.volunteering} />
				</Section>
			)}
			{Object.values(SKILLS).some((skillList) => skillList.length > 0) && (
				<Section {...sectionProps.skills} {...COMMON_SECTION_PROPS}>
					<ResumeSkillEntries skills={SKILLS} />
				</Section>
			)}
			{projects && (
				<Section {...sectionProps.projects} {...COMMON_SECTION_PROPS}>
					<ResumeProjectEntries projects={projects} />
				</Section>
			)}
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
