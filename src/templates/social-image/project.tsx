/*
	Template used to generate Open Graph images for project pages
	-------------------------------------------------------------
*/

import type { PageProps } from 'gatsby';
import { useCallback } from 'react';
import { Section } from '../../components/layout/section';
import { ProjectCard } from '../../components/project-card';
import { SignatureGhostButton } from '../../components/seo/signature-ghost-button';
import { SocialImage } from '../../components/seo/social-image';
import type { ButtonElementRenderFunction } from '../../types/components';
import type { ProjectSocialImagePageContext } from '../../types/page-context';

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ProjectSocialImageTemplate({
	pageContext: { project, imageMetadata },
}: PageProps<null, ProjectSocialImagePageContext>) {
	const renderButton = useCallback(
		(({ className, tooltipPosition }) => (
			<SignatureGhostButton
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
				<ProjectCard project={project} />
			</Section>
		</SocialImage>
	);
}

// biome-ignore lint/performance/noBarrelFile: We need to export the Head component for Gatsby to recognize it
export { SocialImageHead as Head } from '../../components/seo/social-image-head';
