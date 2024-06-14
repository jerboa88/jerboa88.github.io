/*
	Template used to generate Open Graph images for project pages
	-------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { useCallback } from 'react';
import type {
	ButtonElementRenderFunction,
	ImageMetadataProp,
	ProjectInfoInterface,
} from '../../common/types';
import Section from '../../components/layout/section';
import ProjectCard from '../../components/project-card';
import SignatureGhostButtonLink from '../../components/seo/signature-ghost-button';
import SocialImage from '../../components/seo/social-image';

interface PageContext {
	pageContext: ImageMetadataProp & {
		repo: ProjectInfoInterface;
	};
}

export default function ProjectSocialImageTemplate({
	pageContext: { repo, imageMetadata },
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
				title="Project"
				responsive={false}
				renderButton={renderButton}
				className="py-0 px-10"
			>
				<ProjectCard repo={repo} />
			</Section>
		</SocialImage>
	);
}

export { default as Head } from '../../components/seo/social-image-head';
