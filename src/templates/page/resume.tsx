/*
	Template used to generate the resume page
	-----------------------------------------
*/

import { type HeadProps, type PageProps, graphql } from 'gatsby';
import { useRef } from 'react';
import {
	getEducationRoles,
	getEmploymentRoles,
	getPageMetadata,
	getSiteMetadata,
	getVolunteeringRoles,
} from '../../common/config-manager';
import type {
	PageSection,
	ResumePageContext,
	SocialImagesMetadataProp,
} from '../../common/types';
import { getAbsoluteUrl, limit } from '../../common/utils';
import { ResumePageLayout } from '../../components/layout/resume-page-layout';
import { Section } from '../../components/layout/section';
import { ResumeProjectEntries } from '../../components/resume-project-entries';
import { ResumeRoleEntries } from '../../components/resume-role-entries';
import { PageHead } from '../../components/seo/page-head';
import { Article } from '../../components/text/article';

// Types

interface PageContextProp {
	pageContext: SocialImagesMetadataProp & ResumePageContext;
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
const EMPLOYMENT_ROLES = limit(getEmploymentRoles(), 1);
const EDUCATION_ROLES = limit(getEducationRoles(), 1);
const VOLUNTEERING_ROLES = limit(getVolunteeringRoles(), 1);

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ResumePageTemplate({
	data,
	pageContext: { githubRepos },
}: PageContextProp & DataProp & PageProps) {
	const sections = [
		{
			title: 'Highlights',
			ref: useRef(null),
		},
		{
			title: 'Education',
			ref: useRef(null),
		},
		{
			title: 'Projects',
			ref: useRef(null),
		},
		{
			title: 'Employment',
			ref: useRef(null),
		},
		{
			title: 'Volunteering',
			ref: useRef(null),
		},
	] as PageSection[];
	const articleHtml = data.file.childMarkdownRemark.html;

	return (
		<ResumePageLayout>
			<Section
				{...sections[0]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<Article
					html={articleHtml}
					className="text-base-content prose-li:m-0"
				/>
			</Section>
			<Section
				{...sections[1]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeRoleEntries roles={EDUCATION_ROLES} />
			</Section>
			<Section
				{...sections[2]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeProjectEntries githubRepos={githubRepos} />
			</Section>
			<Section
				{...sections[3]}
				sectionHeaderClassName="text-primary"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<ResumeRoleEntries roles={EMPLOYMENT_ROLES} />
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
				className="text-center font-bold"
				dividerClassName="!pb-4"
				responsive={false}
			>
				<p className="text-base">References available upon request</p>
			</Section>
		</ResumePageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { socialImagesMetadata },
}: PageContextProp & DataProp & HeadProps) => {
	const pageMetadata = getPageMetadata('/resume');
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
				'@id': '/author',
			},
			hasDigitalDocumentPermission: [
				{
					'@type': 'DigitalDocumentPermission',
					permissionType: 'https://schema.org/WritePermission',
					grantee: {
						'@id': '/author',
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
			{...{ metadata, structuredData, socialImagesMetadata }}
		/>
	);
};

export const pageQuery = graphql`
  query ResumePage {
		file(name: {eq: "resume"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`;
