/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../common/config-manager';
import { getProjectImage } from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import { H2, P } from '../components/text-components';


interface ProjectPagePropsInterface {
	pageContext: ProjectInfoInterface;
}

export default function ProjectPage({ pageContext }: ProjectPagePropsInterface) {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();

	return (
		<PageLayout siteMetadata={siteMetadata}>
			<img src={getProjectImage(pageContext.imageUrl)} width='500' alt=''></img>
			<H2>{pageContext.name}</H2>
			<P>{pageContext.shortDesc}</P>
			<P>{pageContext.typeName}</P>
			<P>{pageContext.typeColor}</P>
			<a href={pageContext.homepageUrl}>{pageContext.homepageUrl}</a><br />
			<a href={pageContext.githubUrl}>{pageContext.githubUrl}</a>
			<P>{pageContext.stargazers}</P>
			<P>{pageContext.updatedAt}</P>
			<P>{pageContext.license}</P>
			<P>{pageContext.name}</P>
			<P>{pageContext.longDesc}</P>
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
