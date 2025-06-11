/*
	Template used to generate individual project pages
	--------------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faArrowUpRightFromSquare,
	faCode,
} from '@fortawesome/free-solid-svg-icons';
import type { HeadProps, PageProps } from 'gatsby';
import { useCallback, useRef } from 'react';
import { PageLayout } from '../../components/layout/page-layout.tsx';
import { Section } from '../../components/layout/section.tsx';
import { GhostButtonLink } from '../../components/links/ghost-button-link.tsx';
import { PageHead } from '../../components/seo/page-head.tsx';
import { Article } from '../../components/text/article.tsx';
import { AUTHOR_SCHEMA_PATH, PROJECTS_PATH } from '../../config/constants.ts';
import { getSiteMetadata } from '../../managers/config.ts';
import type { ButtonElementRenderFn } from '../../types/components.ts';
import { ProjectType, SchemaType } from '../../types/content/projects.ts';
import type { SocialImagesMetadataProp } from '../../types/other.ts';
import type { ProjectPageContext } from '../../types/page-context.ts';
import type { Maybe } from '../../types/utils.ts';
import { ifDefined, isDefined } from '../../utils/other.ts';
import { toSentence } from '../../utils/strings.ts';
import { getAbsoluteUrl } from '../../utils/urls.ts';
import type { ComponentProps } from 'react';

// Types

type PageContext = ProjectPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();

// Functions

function getSectionButtonRenderFn(
	project: PageContext['project'],
): ButtonElementRenderFn {
	const projectUrl = project.url;
	const homepageUrl = project.homepageUrl;
	const buttonsProps: Pick<
		ComponentProps<typeof GhostButtonLink>,
		'text' | 'tooltipText' | 'icon' | 'to'
	>[] = [];

	if (isDefined(projectUrl)) {
		const text = 'Source';

		let tooltipText = 'View source code';
		let icon = faCode;

		if (project.type === ProjectType.GithubRepo) {
			tooltipText = 'View source code on GitHub';
			icon = faGithub;
		}

		buttonsProps.push({
			text,
			tooltipText,
			icon,
			to: projectUrl,
		});
	}

	// If the homepage URL is pointing to an external site, add a link to it
	if (isDefined(homepageUrl)) {
		const homepageHost = new URL(homepageUrl).host;

		if (homepageHost !== getAbsoluteUrl('/').host) {
			buttonsProps.push({
				text: 'Visit',
				tooltipText: `Visit site at ${homepageHost}`,
				icon: faArrowUpRightFromSquare,
				to: homepageUrl,
			});
		}
	}

	if (buttonsProps.length === 0) {
		return () => null;
	}

	return (remainingProps) => (
		<div className="flex flex-row">
			{buttonsProps.map((buttonProps) => (
				<GhostButtonLink
					key={buttonProps.to}
					responsive
					flip
					{...buttonProps}
					{...remainingProps}
				/>
			))}
		</div>
	);
}

/**
 * Append "Application" to the given value if it is defined
 *
 * @param value - The value to append "Application" to.
 * @returns The given value with "Application" appended, or undefined if the given value is undefined.
 */
function buildAppSchemaValue(value: Maybe<string>) {
	if (isDefined(value)) {
		return `${value}Application`;
	}

	return undefined;
}

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function ProjectPageTemplate({
	pageContext: { project },
}: PageProps<null, PageContext>) {
	const renderSectionButton = useCallback(
		getSectionButtonRenderFn(project),
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
	const computedStargazerCount = project.stargazerCount ?? 0;
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
			'@type': buildAppSchemaValue(project.schema?.type ?? SchemaType.Software),
			...ifDefined({
				applicationCategory: buildAppSchemaValue(
					project.schema?.applicationCategory,
				),
			}),
			...ifDefined({
				operatingSystem: project.schema?.operatingSystem,
			}),
			...(project.type === ProjectType.GithubRepo && {
				image: project.openGraphImageUrl,
				...ifDefined({ license: project.licenseInfo?.url }),
			}),
			name: project.name,
			description: project.description,
			author: {
				'@id': AUTHOR_SCHEMA_PATH,
			},
			url: getAbsoluteUrl(location.pathname).toString(),
			...(computedStargazerCount > 0 && {
				aggregateRating: {
					'@type': 'AggregateRating',
					bestRating: 1,
					worstRating: 1,
					ratingValue: 1,
					ratingCount: computedStargazerCount,
				},
			}),
			offers: {
				'@type': 'Offer',
				price: 0,
				priceCurrency: 'CAD',
			},
		},
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ pageMetadata: metadata, structuredData, socialImagesMetadata }}
		/>
	);
};
