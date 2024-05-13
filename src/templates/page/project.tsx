/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import ConfigManager from '../../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../../common/types';
import { getProjectImage } from '../../common/utilities';
import PageLayout from '../../components/layout/page-layout';
import PageHead from '../../components/seo/page-head';
import Section from '../../components/layout/section';
import { Article } from '../../components/text/article';
import InlineLink from '../../components/links/inline-link';


interface ProjectPageTemplatePropsInterface {
	pageContext: {
		repo: ProjectInfoInterface;
	};
}

export default function ProjectPageTemplate({ pageContext: { repo } }: ProjectPageTemplatePropsInterface) {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const section = {
		id: 'project',
		title: repo.name,
		ref: useRef(null),
	} as SectionInterface;

	return (
		<PageLayout siteMetadata={siteMetadata}>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section {...section}>
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
	const siteMetadata = new ConfigManager().getMetadata();
	const pageMetadata = {
		title: `${repo.name} | ${siteMetadata.shortTitle}`,
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
			url: new URL(location.pathname, siteMetadata.siteUrl).toString(),
			image: repo.imageUrl,
			license: repo.license,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
	);
}
