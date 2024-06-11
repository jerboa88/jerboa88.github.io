/*
	Template used to generate Open Graph images for project pages
	-------------------------------------------------------------
*/


import React, { useCallback } from 'react'
import { PageProps } from 'gatsby';
import { ButtonElementRenderFunction, ImageMetadataProp, ProjectInfoInterface } from '../../common/types';
import OgImage from '../../components/seo/og-image';
import ProjectCard from '../../components/project-card'
import Section from '../../components/layout/section';
import SignatureGhostButtonLink from '../../components/seo/signature-ghost-button';


interface PageContext {
	pageContext: ImageMetadataProp & {
		repo: ProjectInfoInterface;
	};
}

export default function ProjectOgImageTemplate({ pageContext: { repo, imageMetadata } }: PageContext & PageProps) {
	const renderButton = useCallback((({ className, tooltipPosition }) => (
		<SignatureGhostButtonLink className={className} tooltipPosition={tooltipPosition} />
	)) as ButtonElementRenderFunction, []);

	return (
		<OgImage size={imageMetadata.size} className="justify-center">
			<Section title="Project" responsive={false} renderButton={renderButton} className="py-0 px-10">
				<ProjectCard repo={repo} />
			</Section>
		</OgImage>
	)
}

export { default as Head } from '../../components/seo/og-image-head'
