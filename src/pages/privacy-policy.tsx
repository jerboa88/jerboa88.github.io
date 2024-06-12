/*
	Privacy Policy page
	-------------------
*/


import React, { useRef } from 'react';
import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { PageMetadataProp, SocialImagesMetadataProp } from '../common/types';
import ConfigManager from '../common/config-manager';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import PageHead from '../components/seo/page-head';
import SolidButtonLink from '../components/links/solid-button-link';
import { Article } from '../components/text/article';
import { getAbsoluteUrl } from '../common/utilities';


// Types

interface PageContextProp {
	pageContext: PageMetadataProp & SocialImagesMetadataProp;
}

interface DataProp {
	data: {
		file: {
			childMarkdownRemark: {
				html: string;
			};
		};
	};
}


// Constants

const SITE_METADATA = new ConfigManager().getSiteMetadata();


export default function PrivacyPolicyPage({ data, pageContext: { pageMetadata } }: PageContextProp & DataProp & PageProps) {
	const articleHtml = data.file.childMarkdownRemark.html;

	return (
		<PageLayout siteMetadata={SITE_METADATA}>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section title={pageMetadata.title} ref={useRef(null)} className="items-center" >
				<div className="flex flex-col gap-8 items-center">
					<Article html={articleHtml} />
					<SolidButtonLink text="Home" to="/" isInternal />
				</div>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location, pageContext: { pageMetadata, socialImagesMetadata } }: PageContextProp & DataProp & HeadProps) => {
	const pageTitle = `${pageMetadata.title} | ${SITE_METADATA.shortTitle}`;
	const metadata = {
		title: pageTitle,
		shortTitle: pageMetadata.shortTitle,
		description: pageMetadata.description,
	};
	const structuredData = {
		'@type': 'WebPage',
		name: pageTitle,
		description: pageMetadata.description,
		url: getAbsoluteUrl(location.pathname),
		mainEntity: {
			'@type': 'Article',
			headline: pageMetadata.shortTitle,
			description: pageMetadata.description,
			author: {
				'@id': '/author'
			}
		},
	}

	return (
		<PageHead path={location.pathname} {...{ metadata, structuredData, socialImagesMetadata }} />
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
