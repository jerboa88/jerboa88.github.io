/*
	Template used to generate individual project pages
	--------------------------------------------------
*/

import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import {
	ProjectInfoInterface,
	SocialImagesMetadataProp,
} from '../../common/types';
import PageLayout from '../../components/layout/page-layout';
import PageHead from '../../components/seo/page-head';
import Section from '../../components/layout/section';
import { Article } from '../../components/text/article';
import InlineLink from '../../components/links/inline-link';
import { getAbsoluteUrl } from '../../common/utilities';
import { getSiteMetadata } from '../../common/config-manager';

// Types

interface Props {
	pageContext: SocialImagesMetadataProp & {
		repo: ProjectInfoInterface;
	};
}

// Constants

const SITE_METADATA = getSiteMetadata();

export default function ProjectPageTemplate({ pageContext: { repo } }: Props) {
	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title={repo.name} ref={useRef(null)}>
				<Article>
					<img src={repo.imageUrl} width="500" alt="TODO" />
					<p>{repo.shortDesc}</p>
					<p>{repo.typeName}</p>
					<p>{repo.typeColor}</p>
					<InlineLink to={repo.homepageUrl} text={repo.homepageUrl} />
					<br />
					<InlineLink to={repo.githubUrl} text={repo.githubUrl} />
					<p>{repo.stargazers}</p>
					<p>{repo.updatedAt}</p>
					<p>{repo.license}</p>
					<p>{repo.name}</p>
					<p>{repo.longDesc}</p>
				</Article>
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { repo, socialImagesMetadata },
}: HeadProps & Props) => {
	const pageTitle = `${repo.name} | ${SITE_METADATA.shortTitle}`;
	const metadata = {
		title: pageTitle,
		shortTitle: repo.name,
		// TODO: Strip newlines and HTML tags from the long description
		description: repo.longDesc,
		path: location.pathname,
	};

	const structuredData = {
		'@type': 'WebPage',
		name: pageTitle,
		description: repo.longDesc,
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
					name: repo.name,
				},
			],
		},
		mainEntity: {
			'@type': 'SoftwareApplication',
			name: repo.name,
			description: repo.longDesc,
			author: {
				'@id': '/author',
			},
			url: getAbsoluteUrl(location.pathname).toString(),
			image: repo.imageUrl,
			// TODO: Add applicationCategory and operatingSystem properties
			license: repo.licenseUrl,
			offers: {
				'@type': 'Offer',
				price: 0,
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
