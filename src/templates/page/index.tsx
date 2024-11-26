/*
	Template used to generate the landing page
	------------------------------------------
*/

import {
	faAngleDown,
	faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'framer-motion';
import type { HeadProps, PageProps } from 'gatsby';
import { Suspense, lazy, useCallback, useRef } from 'react';
import {
	getEmploymentRoles,
	getSiteMetadata,
} from '../../common/config-manager.ts';
import { USE_IN_VIEW_OPTIONS } from '../../common/constants.ts';
import { limit } from '../../common/utils/other.ts';
import { toKebabCase } from '../../common/utils/strings.ts';
import { HeroHeader } from '../../components/layout/hero-header.tsx';
import { PageLayout } from '../../components/layout/page-layout.tsx';
import { Section } from '../../components/layout/section.tsx';
import { GhostButtonLink } from '../../components/links/ghost-button-link.tsx';
import { Loader } from '../../components/loader.tsx';
import { ProjectCardGallery } from '../../components/project-card-gallery.tsx';
import { PageHead } from '../../components/seo/page-head.tsx';
import { Article } from '../../components/text/article.tsx';
import { Timeline } from '../../components/timeline.tsx';
import type {
	ButtonElementRenderFunction,
	PageSection,
} from '../../types/components.ts';
import type { SocialImagesMetadataProp } from '../../types/other.ts';
import type { IndexPageContext } from '../../types/page-context.ts';

// Types

type PageContext = IndexPageContext & SocialImagesMetadataProp;

// Constants

const SITE_METADATA = getSiteMetadata();
const EMPLOYMENT_ROLES = limit(getEmploymentRoles(), 2);

const ContactForm = lazy(() =>
	import('../../components/input/contact-form.tsx').then((module) => ({
		default: module.ContactForm,
	})),
);

// biome-ignore lint/style/noDefaultExport: Templates must use default exports
export default function IndexPageTemplate({
	pageContext: { projects, authorBioHtml },
}: PageProps<null, PageContext>) {
	const inViewTriggerRef = useRef(null);
	const expandTitle = useInView(inViewTriggerRef, USE_IN_VIEW_OPTIONS);
	const sections = [
		{
			title: 'About',
			ref: useRef(null),
		},
		{
			title: 'Projects',
			ref: useRef(null),
		},
		{
			title: 'Experience',
			ref: useRef(null),
		},
		{
			title: 'Contact',
			ref: useRef(null),
		},
	] as PageSection[];

	const projectsSectionButton = useCallback(
		((remainingProps) => (
			<GhostButtonLink
				text="View more on GitHub"
				icon={faArrowUpRightFromSquare}
				to={SITE_METADATA.author.url.github}
				responsive
				flip
				{...remainingProps}
			/>
		)) as ButtonElementRenderFunction,
		[],
	);

	const experienceSectionButton = useCallback(
		((remainingProps) => (
			<GhostButtonLink
				text="View more on LinkedIn"
				icon={faArrowUpRightFromSquare}
				to={SITE_METADATA.author.url.linkedin}
				responsive
				flip
				{...remainingProps}
			/>
		)) as ButtonElementRenderFunction,
		[],
	);

	return (
		<PageLayout expandTitle={expandTitle} sections={sections}>
			<Section className="text-center min-h-svh">
				<span ref={inViewTriggerRef} />
				<HeroHeader expandTitle={expandTitle} />
				<div className="flex fixed inset-x-0 bottom-0 flex-row justify-center mb-4">
					<GhostButtonLink
						to={`#${toKebabCase(sections[0].title)}`}
						icon={faAngleDown}
						tooltipText={`Go to ${sections[0].title} section`}
						className={expandTitle ? '' : 'opacity-0'}
						isInternal
					/>
				</div>
			</Section>
			<Section className="min-h-lvh" {...sections[0]}>
				<Article html={authorBioHtml} />
			</Section>
			<Section
				renderButton={projectsSectionButton}
				className="min-h-lvh"
				{...sections[1]}
			>
				<ProjectCardGallery projects={projects} />
			</Section>
			<Section
				renderButton={experienceSectionButton}
				className="min-h-lvh"
				{...sections[2]}
			>
				<Timeline roles={EMPLOYMENT_ROLES} />
			</Section>
			<Section className="min-h-lvh" {...sections[3]}>
				<Article className="flex flex-col justify-center w-full">
					<p>
						Got something on your mind? Whether you have a question or just want
						to say hello, feel free to reach out to me using the form below.
					</p>
					<Suspense
						fallback={
							<Loader className="max-w-xl h-[29rem] p-0 sm:p-8 self-center" />
						}
					>
						<ContactForm className="self-center" />
					</Suspense>
				</Article>
			</Section>
		</PageLayout>
	);
}

export const Head = ({
	location,
	pageContext: { socialImagesMetadata },
}: HeadProps<null, PageContext>) => {
	const metadata = {
		title: SITE_METADATA.title,
		shortTitle: SITE_METADATA.shortTitle,
		description: SITE_METADATA.description,
	};
	const structuredData = {
		'@type': 'WebSite',
		name: SITE_METADATA.shortTitle,
		alternateName: [
			SITE_METADATA.title,
			new URL(SITE_METADATA.siteUrl).hostname,
		],
		description: SITE_METADATA.description,
		url: SITE_METADATA.siteUrl,
	};

	return (
		<PageHead
			path={location.pathname}
			{...{ pageMetadata: metadata, structuredData, socialImagesMetadata }}
		/>
	);
};
