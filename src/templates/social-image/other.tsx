/*
	Template used to generate Open Graph images for all other pages
	---------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { useCallback } from 'react';
import { Section } from '../../components/layout/section.tsx';
import { SignatureGhostButton } from '../../components/seo/signature-ghost-button.tsx';
import { SocialImage } from '../../components/seo/social-image.tsx';
import { Article } from '../../components/text/article.tsx';
import type { ButtonElementRenderFn } from '../../types/components.ts';
import type { OtherSocialImagePageContext } from '../../types/page-context.ts';

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function OtherSocialImageTemplate({
	pageContext: { pageMetadata, imageMetadata },
}: PageProps<null, OtherSocialImagePageContext>) {
	const renderButton = useCallback(
		(({ className, tooltipPosition }) => (
			<SignatureGhostButton
				className={className}
				tooltipPosition={tooltipPosition}
			/>
		)) as ButtonElementRenderFn,
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
export { SocialImageHead as Head } from '../../components/seo/social-image-head.tsx';
