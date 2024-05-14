/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useCallback, useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { motion, useInView } from 'framer-motion';
import { faAngleDown, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ButtonElementRenderFunction, ProjectInfoInterface, SectionInterface } from '../../common/types';
import { USE_IN_VIEW_OPTIONS } from '../../common/constants';
import ConfigManager from '../../common/config-manager';
import Section from '../../components/layout/section';
import PageLayout from '../../components/layout/page-layout';
import PageHead from '../../components/seo/page-head';
import HeroHeader from '../../components/layout/hero-header';
import { Article } from '../../components/text/article';
import GhostButtonLink from '../../components/links/ghost-button-link';
import ContactForm from '../../components/input/contact-form';
import ProjectCardGallery from '../../components/project-card-gallery';
import Timeline from '../../components/timeline';
import { toKebabCase } from '../../common/utilities';


// Types

interface IndexPageTemplatePropsInterface {
	pageContext: {
		pinnedRepos: ProjectInfoInterface[];
	};
}


// Constants

const configManager = new ConfigManager();
const SITE_METADATA = configManager.getMetadata();
const JOBS = configManager.getJobs();


export default function IndexPageTemplate({ pageContext }: IndexPageTemplatePropsInterface) {
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
		}
	] as SectionInterface[];

	const projectsSectionButton = useCallback((remainingProps => (
		<GhostButtonLink
			text="View more on GitHub"
			icon={faArrowUpRightFromSquare}
			to={SITE_METADATA.author.link.github}
			responsive flip
			{...remainingProps} />
	)) as ButtonElementRenderFunction, []);

	const experienceSectionButton = useCallback((remainingProps => (
		<GhostButtonLink
			text="View more on LinkedIn"
			icon={faArrowUpRightFromSquare}
			to={SITE_METADATA.author.link.linkedin}
			responsive flip
			{...remainingProps} />
	)) as ButtonElementRenderFunction, []);

	return (
		<PageLayout siteMetadata={SITE_METADATA} expandTitle={expandTitle} sections={sections}>
			<Section className="text-center min-h-svh">
				<span ref={inViewTriggerRef} />
				<HeroHeader expandTitle={expandTitle} />
				<div className="flex fixed inset-x-0 bottom-0 flex-row justify-center mb-4">
					<GhostButtonLink
						to={`#${toKebabCase(sections[0].title)}`}
						icon={faAngleDown}
						tooltipText={`Go to ${sections[0].title} section`}
						className={expandTitle ? '' : 'opacity-0'}
						isInternal />
				</div>
			</Section>
			<Section className="min-h-lvh" {...sections[0]}>
				<Article>
					<p>
						I am a recent graduate with a Bachelors Specialization in Computing Science from the University of Alberta. During my time at the U of A, I had the opportunity to share my expertise with Haemonetics Corporation in Edmonton, where I was involved in end-to-end development of their NexLynk Donor Management System.
					</p>
					<p>
						Having a natural interest in science has allowed me to become familiar with a wide variety of tech related subjects including programming, design, and audio production. I have experience with frontend web technologies, backend development, cloud computing, as well as low-level programming like Arduino and MIPS assembly.
					</p>
					<p>
						Some of my extracurricular interests include cats, cars, and music!
					</p>
				</Article>
			</Section>
			<Section renderButton={projectsSectionButton} className="min-h-lvh" {...sections[1]}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section renderButton={experienceSectionButton} className="min-h-lvh" {...sections[2]}>
				<Timeline roles={JOBS} />
			</Section>
			<Section className="min-h-lvh" {...sections[3]}>
				<Article className="flex flex-col justify-center w-full">
					<p>
						Got something on your mind? Whether it's a query, a collaboration proposal, or just a friendly hello, feel free to reach out using the form below.
					</p>
					<ContactForm className="self-center" />
				</Article>
			</Section>
		</PageLayout>
	);
}

export const Head = ({ location }: HeadProps) => {
	const pageMetadata = {
		title: SITE_METADATA.title,
		description: SITE_METADATA.description,
		shortDescription: SITE_METADATA.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(SITE_METADATA.ogImagePath, SITE_METADATA.siteUrl).toString(),
		ogImageAltText: SITE_METADATA.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: SITE_METADATA.title,
			description: SITE_METADATA.description,
			url: SITE_METADATA.siteUrl,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
	);
}
