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
import { P } from '../components/text-components';
import LinkWrapper from '../components/links/link-wrapper';


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
			<Section className="items-center" {...section}>
				<img src={getProjectImage(pageContext.imageUrl)} width="500" alt="TODO"></img>
				<P>{pageContext.shortDesc}</P>
				<P>{pageContext.typeName}</P>
				<P>{pageContext.typeColor}</P>
				<LinkWrapper to={pageContext.homepageUrl}>
					{pageContext.homepageUrl}}
				</LinkWrapper>
				<LinkWrapper to={pageContext.githubUrl}>
					{pageContext.githubUrl}}
				</LinkWrapper>
				<P>{pageContext.stargazers}</P>
				<P>{pageContext.updatedAt}</P>
				<P>{pageContext.license}</P>
				<P>{pageContext.name}</P>
				<P>{pageContext.longDesc}</P>
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
