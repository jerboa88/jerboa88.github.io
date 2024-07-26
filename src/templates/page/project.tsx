/*
	Template used to generate individual project pages
	--------------------------------------------------
*/

import type { HeadProps, PageProps } from 'gatsby';
import { useRef } from 'react';
import { getSiteMetadata } from '../../common/config-manager';
import type {
	ProjectPageContext,
	SocialImagesMetadataProp,
} from '../../common/types';
import { getAbsoluteUrl } from '../../common/utils';
import { PageLayout } from '../../components/layout/page-layout';
import { Section } from '../../components/layout/section';
import { InlineLink } from '../../components/links/inline-link';
import { PageHead } from '../../components/seo/page-head';
import { Article } from '../../components/text/article';
import { DateRange } from '../../components/text/date-range';

// Types

type PageContext = ProjectPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ProjectPageTemplate({
	pageContext: { githubRepo },
}: PageProps<null, PageContext>) {
	const updatedAt = new Date(githubRepo.updatedAt);

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title={githubRepo.name} ref={useRef(null)}>
				<Article>
					{githubRepo.logoUrl && (
						<img src={githubRepo.logoUrl} width="500" alt="TODO" />
					)}
					<img src={githubRepo.openGraphImageUrl} width="500" alt="TODO" />
					<p>{githubRepo.description}</p>
					<p>{githubRepo.type.name}</p>
					<p>{githubRepo.type.color}</p>
					{githubRepo.homepageUrl && (
						<InlineLink
							to={githubRepo.homepageUrl}
							text={githubRepo.homepageUrl}
						/>
					)}
					<br />
					<InlineLink to={githubRepo.url} text={githubRepo.url} />
					<p>{githubRepo.stargazerCount}</p>
					<DateRange endDate={updatedAt} />
					<p>{githubRepo.licenseInfo?.name}</p>
					<p>{githubRepo.licenseInfo?.spdxId}</p>
					<p>{githubRepo.licenseInfo?.url}</p>
					<p>{githubRepo.name}</p>
					<p>{githubRepo.descriptionHtml}</p>
				</Article>
				{githubRepo.childMarkdownRemark?.html && (
					<Article html={githubRepo.childMarkdownRemark.html} />
				)}
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { githubRepo, socialImagesMetadata },
}: HeadProps<null, PageContext>) => {
	const pageTitle = `${githubRepo.name} | ${SITE_METADATA.shortTitle}`;
	const metadata = {
		title: pageTitle,
		shortTitle: githubRepo.name,
		description: githubRepo.description,
		path: location.pathname,
	};

	const structuredData = {
		'@type': 'WebPage',
		name: pageTitle,
		description: githubRepo.description,
		url: getAbsoluteUrl(location.pathname).toString(),
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Projects',
					item: getAbsoluteUrl('#projects').toString(),
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: githubRepo.name,
				},
			],
		},
		mainEntity: {
			'@type': 'SoftwareApplication',
			name: githubRepo.name,
			description: githubRepo.description,
			author: {
				'@id': '/author',
			},
			url: getAbsoluteUrl(location.pathname).toString(),
			image: githubRepo.openGraphImageUrl,
			// TODO: Add applicationCategory and operatingSystem properties
			license: githubRepo.licenseInfo?.url,
			offers: {
				'@type': 'Offer',
				price: 0,
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
