/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../../common/config-manager';
import { ProjectInfoInterface } from '../../common/types';
import { getProjectImage } from '../../common/utilities';
import PageLayout from '../../components/layout/page-layout';
import PageHead from '../../components/seo/page-head';
import Section from '../../components/layout/section';
import { Article } from '../../components/text/article';
import InlineLink from '../../components/links/inline-link';


// Types

interface ProjectPageTemplatePropsInterface {
	pageContext: {
		repo: ProjectInfoInterface;
	};
}


// Constants
const SITE_METADATA = new ConfigManager().getSiteMetadata();


export default function ProjectPageTemplate({ pageContext: { repo } }: ProjectPageTemplatePropsInterface) {
	return (
		<PageLayout siteMetadata={SITE_METADATA}>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title={repo.name} ref={useRef(null)}>
				<Article>
					<img src={getProjectImage(repo.imageUrl)} width="500" alt="TODO" />
					<p>
						{repo.shortDesc}
					</p>
					<p>
						{repo.typeName}
					</p>
					<p>
						{repo.typeColor}
					</p>
					<InlineLink to={repo.homepageUrl} text={repo.homepageUrl} />
					<br />
					<InlineLink to={repo.githubUrl} text={repo.githubUrl} />
					<p>
						{repo.stargazers}
					</p>
					<p>
						{repo.updatedAt}
					</p>
					<p>
						{repo.license}
					</p>
					<p>
						{repo.name}
					</p>
					<p>
						{repo.longDesc}
					</p>
				</Article>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location, pageContext: { repo } }: HeadProps & ProjectPageTemplatePropsInterface) => {
	const pageMetadata = {
		title: `${repo.name} | ${SITE_METADATA.shortTitle}`,
		// TODO: Strip newlines and HTML tags from the long description
		description: repo.longDesc,
		shortDescription: repo.shortDesc,
		path: location.pathname,
		ogImageUrl: repo.imageUrl,
		ogImageAltText: `Cover image for ${repo.name}`,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: repo.name,
			description: repo.longDesc,
			url: new URL(location.pathname, SITE_METADATA.siteUrl).toString(),
			image: repo.imageUrl,
			license: repo.license,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
	);
}
