/*
	Template used to generate individual project pages
	--------------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import type { HeadProps, PageProps } from 'gatsby';
import { useCallback, useRef } from 'react';
import { getSiteMetadata } from '../../common/config-manager.ts';
import { JSON_LD_AUTHOR_PATH, PROJECTS_PATH } from '../../common/constants.ts';
import { isDefined, removeUndefinedProps } from '../../common/utils/other.ts';
import { toSentence } from '../../common/utils/strings.ts';
import { getAbsoluteUrl } from '../../common/utils/urls.ts';
import { PageLayout } from '../../components/layout/page-layout.tsx';
import { Section } from '../../components/layout/section.tsx';
import { GhostButtonLink } from '../../components/links/ghost-button-link.tsx';
import { PageHead } from '../../components/seo/page-head.tsx';
import { Article } from '../../components/text/article.tsx';
import type { ButtonElementRenderFunction } from '../../types/components.ts';
import { ProjectCategory } from '../../types/content/projects.ts';
import type { SocialImagesMetadataProp } from '../../types/other.ts';
import type { ProjectPageContext } from '../../types/page-context.ts';

// Types

type PageContext = ProjectPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// Functions

function getSectionButtonRenderFunction(
	project: PageContext['project'],
): ButtonElementRenderFunction {
	const projectUrl = project.url;

	if (!isDefined(projectUrl)) {
		return () => null;
	}

	let buttonText = 'View project page';
	let buttonIcon = faGlobe;

	if (project.category === ProjectCategory.GithubRepo) {
		buttonText = 'View source code on GitHub';
		buttonIcon = faGithub;
	}

	return (remainingProps) => (
		<GhostButtonLink
			text={buttonText}
			icon={buttonIcon}
			to={projectUrl}
			responsive
			flip
			{...remainingProps}
		/>
	);
}

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ProjectPageTemplate({
	pageContext: { project },
}: PageProps<null, PageContext>) {
	const renderSectionButton = useCallback(
		getSectionButtonRenderFunction(project),
		[],
	);
	const sectionRef = useRef<HTMLDivElement>(null);

	return (
		<PageLayout>
			{/* Dummy element to force center alignment of section */}
			<div />
			<Section
				title={project.name}
				renderButton={renderSectionButton}
				ref={sectionRef}
			>
				<Article>
					<p>{toSentence(project.description)}</p>
				</Article>
				{/* TODO: Re-enable this when code highlighting, relative image URLS, and custom styling is fixed */}
				{/* {project.childMarkdownRemark?.html && (
					<Article html={project.childMarkdownRemark.html} />
				)} */}
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { project, socialImagesMetadata },
}: HeadProps<null, PageContext>) => {
	const pageTitle = `${project.name} | ${SITE_METADATA.shortTitle}`;
	const metadata = {
		title: pageTitle,
		shortTitle: project.name,
		description: project.description,
		path: location.pathname,
	};

	let githubRepoProjectProps = {};

	if (project.category === ProjectCategory.GithubRepo) {
		githubRepoProjectProps = removeUndefinedProps({
			image: project.openGraphImageUrl,
			// TODO: Add applicationCategory and operatingSystem properties
			license: project.licenseInfo?.url,
		});
	}

	const structuredData = {
		'@type': 'WebPage',
		name: pageTitle,
		description: project.description,
		url: getAbsoluteUrl(location.pathname).toString(),
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Projects',
					item: getAbsoluteUrl(PROJECTS_PATH).toString(),
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: project.name,
				},
			],
		},
		mainEntity: {
			'@type': 'SoftwareApplication',
			name: project.name,
			description: project.description,
			author: {
				'@id': JSON_LD_AUTHOR_PATH,
			},
			url: getAbsoluteUrl(location.pathname).toString(),
			offers: {
				'@type': 'Offer',
				price: 0,
			},
			...githubRepoProjectProps,
		},
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ pageMetadata: metadata, structuredData, socialImagesMetadata }}
		/>
	);
};
