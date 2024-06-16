/*
	Template used to generate Open Graph images for all other pages
	---------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { useCallback } from 'react';
import type {
	ButtonElementRenderFunction,
	ImageMetadataProp,
	PageMetadataProp,
} from '../../common/types';
import { Section } from '../../components/layout/section';
import { SignatureGhostButton as SignatureGhostButtonLink } from '../../components/seo/signature-ghost-button';
import { SocialImage } from '../../components/seo/social-image';
import { Article } from '../../components/text/article';

// Types

interface PageContext {
	pageContext: PageMetadataProp & ImageMetadataProp;
}

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function OtherSocialImageTemplate({
	pageContext: { pageMetadata, imageMetadata },
}: PageContext & PageProps) {
	const renderButton = useCallback(
		(({ className, tooltipPosition }) => (
			<SignatureGhostButtonLink
				className={className}
				tooltipPosition={tooltipPosition}
			/>
		)) as ButtonElementRenderFunction,
		[],
	);

	return (
		<SocialImage size={imageMetadata.size} className="justify-center">
			<Section
				title={pageMetadata.title}
				responsive={false}
				renderButton={renderButton}
				className="py-0 px-10 max-w-[70%]"
			>
				<Article>
					<p>{pageMetadata.description}</p>
				</Article>
			</Section>
		</SocialImage>
	);
}

// biome-ignore lint/performance/noBarrelFile: We need to export the Head component for Gatsby to recognize it
export { SocialImageHead as Head } from '../../components/seo/social-image-head';
