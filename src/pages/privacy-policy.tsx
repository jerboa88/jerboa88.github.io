/*
	Privacy Policy page
	-------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { graphql } from 'gatsby';
import ConfigManager from '../common/config-manager';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import PageHead from '../components/seo/page-head';
import SolidButtonLink from '../components/links/solid-button-link';
import { Article } from '../components/text/article';


// Types

interface PrivacyPolicyPageProps {
	data: {
		file: {
			childMarkdownRemark: {
				html: string;
			};
		};
	};
}


// Constants

const PAGE_TITLE = 'Privacy Policy';
const SITE_METADATA = new ConfigManager().getMetadata();


export default function PrivacyPolicyPage({ data }: PrivacyPolicyPageProps) {
	const articleHtml = data.file.childMarkdownRemark.html;

	return (
		<PageLayout siteMetadata={SITE_METADATA}>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title={PAGE_TITLE} ref={useRef(null)} className="items-center" >
				<div className="flex flex-col gap-8 items-center">
					<Article html={articleHtml} />
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location }: HeadProps) => {
	const pageMetadata = {
		title: `${PAGE_TITLE} | ${SITE_METADATA.shortTitle}`,
		description: SITE_METADATA.description,
		shortDescription: SITE_METADATA.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(SITE_METADATA.ogImagePath, SITE_METADATA.siteUrl).toString(),
		ogImageAltText: SITE_METADATA.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: PAGE_TITLE,
			description: SITE_METADATA.description,
			url: SITE_METADATA.siteUrl,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
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
