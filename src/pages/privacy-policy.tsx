/*
	Privacy Policy page
	-------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { graphql } from 'gatsby';
import ConfigManager from '../common/config-manager';
import { SectionInterface } from '../common/types';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import SolidButtonLink from '../components/links/solid-button-link';
import { Article } from '../components/text/article';


const pageTitle = 'Privacy Policy';


interface PrivacyPolicyPageProps {
	data: {
		file: {
			childMarkdownRemark: {
				html: string;
			};
		};
	};
}


export default function PrivacyPolicyPage({ data }: PrivacyPolicyPageProps) {
	const titleLayoutId = 'title-layout';
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const section = {
		id: 'privacy-policy',
		title: pageTitle,
		ref: useRef(null),
	} as SectionInterface;
	const articleHtml = data.file.childMarkdownRemark.html;

	return (
		<PageLayout siteMetadata={siteMetadata} titleLayoutId={titleLayoutId} isTitleExpanded={false}>
			{/* Dummy element to force center alignment of section */}
			<div></div>
			<Section className="items-center" {...section}>
				<div className="flex flex-col items-center gap-8">
					<Article html={articleHtml} />
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location }: HeadProps) => {
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const pageMetadata = {
		title: `${pageTitle} | ${siteMetadata.shortTitle}`,
		description: siteMetadata.description,
		shortDescription: siteMetadata.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(siteMetadata.ogImagePath, siteMetadata.siteUrl).toString(),
		ogImageAltText: siteMetadata.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: pageTitle,
			description: siteMetadata.description,
			url: siteMetadata.siteUrl,
		}
	};

	return (
		<SEO pageMetadata={pageMetadata} />
	);
}


export const pageQuery = graphql`
  query {
		file(name: {eq: "privacy-policy"}) {
			childMarkdownRemark {
				html
			}
		}
  }
`
