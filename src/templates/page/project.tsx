/*
	Template used to generate individual project pages
	--------------------------------------------------
*/

import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import type { HeadProps, PageProps } from 'gatsby';
import { useCallback, useRef } from 'react';
import { getSiteMetadata } from '../../common/config-manager';
import { JSON_LD_AUTHOR_PATH } from '../../common/constants';
import type {
	ButtonElementRenderFunction,
	ProjectPageContext,
	SocialImagesMetadataProp,
} from '../../common/types';
import { getAbsoluteUrl, toSentence } from '../../common/utils';
import { PageLayout } from '../../components/layout/page-layout';
import { Section } from '../../components/layout/section';
import { GhostButtonLink } from '../../components/links/ghost-button-link';
import { PageHead } from '../../components/seo/page-head';
import { Article } from '../../components/text/article';

// Types

type PageContext = ProjectPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ProjectPageTemplate({
	pageContext: { githubRepo },
}: PageProps<null, PageContext>) {
	const githubButton = useCallback(
		((remainingProps) => (
			<GhostButtonLink
				text="View project on GitHub"
				icon={faArrowUpRightFromSquare}
				to={githubRepo.url}
				responsive
				flip
				{...remainingProps}
			/>
		)) as ButtonElementRenderFunction,
		[],
	);

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={githubRepo.name}
				renderButton={githubButton}
				ref={useRef(null)}
			>
				<Article>
					<p>{toSentence(githubRepo.description)}</p>
				</Article>
				{/* TODO: Re-enable this when code highlighting, relative image URLS, and custom styling is fixed */}
				{/* {githubRepo.childMarkdownRemark?.html && (
					<Article html={githubRepo.childMarkdownRemark.html} />
				)} */}
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
				'@id': JSON_LD_AUTHOR_PATH,
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
