/*
	Template used to generate Open Graph images for all other pages
	---------------------------------------------------------------
*/


import React, { useCallback } from 'react';
import { PageProps } from 'gatsby';
import { ButtonElementRenderFunction, ImageMetadataProp, PageMetadataProp } from '../../common/types';
import SocialImage from '../../components/seo/social-image';
import { Article } from '../../components/text/article';
import Section from '../../components/layout/section';
import SignatureGhostButtonLink from '../../components/seo/signature-ghost-button';


// Types

interface PageContext {
	pageContext: PageMetadataProp & ImageMetadataProp;
}

export default function OtherSocialImageTemplate({ pageContext: { pageMetadata, imageMetadata } }: PageContext & PageProps) {
	const renderButton = useCallback((({ className, tooltipPosition }) => (
		<SignatureGhostButtonLink className={className} tooltipPosition={tooltipPosition} />
	)) as ButtonElementRenderFunction, []);

	return (
		<SocialImage size={imageMetadata.size} className="justify-center">
			<Section title={pageMetadata.title} responsive={false} renderButton={renderButton} className="py-0 px-10 max-w-[70%]">
				<Article>
					<p>
						{pageMetadata.description}
					</p>
				</Article>
			</Section>
		</SocialImage>
	)
}

export { default as Head } from '../../components/seo/social-image-head'