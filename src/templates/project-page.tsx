/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../common/types';
import { getProjectImage } from '../common/utilities';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import Section from '../components/layout/section';
import { Article } from '../components/text/article';
import InlineLink from '../components/links/inline-link';


interface ProjectPageTemplatePropsInterface {
	pageContext: ProjectInfoInterface;
}

export default function ProjectPageTemplate({ pageContext }: ProjectPageTemplatePropsInterface) {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const section = {
		id: 'project',
		title: pageContext.name,
		ref: useRef(null),
	} as SectionInterface;

	return (
		<PageLayout siteMetadata={siteMetadata}>
			{/* Dummy element to force center alignment of section */}
			<div></div>
			<Section {...section}>
				<Article>
					<img src={getProjectImage(pageContext.imageUrl)} width="500" alt="TODO"></img>
					<p>
						{pageContext.shortDesc}
					</p>
					<p>
						{pageContext.typeName}
					</p>
					<p>
						{pageContext.typeColor}
					</p>
					<InlineLink to={pageContext.homepageUrl} text={pageContext.homepageUrl} />
					<br />
					<InlineLink to={pageContext.githubUrl} text={pageContext.githubUrl} />
					<p>
						{pageContext.stargazers}
					</p>
					<p>
						{pageContext.updatedAt}
					</p>
					<p>
						{pageContext.license}
					</p>
					<p>
						{pageContext.name}
					</p>
					<p>
						{pageContext.longDesc}
					</p>
				</Article>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location, pageContext }: HeadProps) => {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const pageMetadata = {
		title: `${pageContext.name} | ${siteMetadata.shortTitle}`,
		// TODO: Strip newlines and HTML tags from the long description
		description: pageContext.longDesc,
		shortDescription: pageContext.shortDesc,
		path: location.pathname,
		ogImageUrl: pageContext.imageUrl,
		ogImageAltText: `Cover image for ${pageContext.name}`,
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: pageContext.name,
			description: pageContext.longDesc,
			url: new URL(location.pathname, siteMetadata.siteUrl).toString(),
			image: pageContext.imageUrl,
			license: pageContext.license,
		}
	};

	return (
		<SEO pageMetadata={pageMetadata} />
	);
}
