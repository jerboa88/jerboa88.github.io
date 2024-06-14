/*
	Template used to generate an Open Graph image for the landing page
	------------------------------------------------------------------
*/

import { PageProps } from 'gatsby';
import { ImageMetadataProp } from '../../common/types';
import HeroHeader from '../../components/layout/hero-header';
import SocialImage from '../../components/seo/social-image';
import GhostButton from '../../components/input/ghost-button';
import SignatureGhostButtonLink from '../../components/seo/signature-ghost-button';

interface PageContext {
	pageContext: ImageMetadataProp;
}

export default function IndexSocialImageTemplate({
	pageContext: { imageMetadata },
}: PageContext & PageProps) {
	return (
		<SocialImage
			size={imageMetadata.size}
			className="justify-between text-center"
		>
			<SignatureGhostButtonLink />
			<div className="flex flex-col">
				<HeroHeader expandTitle />
			</div>
			{/* Dummy element to force center alignment of section */}
			<GhostButton text="" />
		</SocialImage>
	);
}

export { default as Head } from '../../components/seo/social-image-head';
