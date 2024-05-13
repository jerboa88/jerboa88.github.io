/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useCallback, useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { motion, useInView } from 'framer-motion';
import { faAngleDown, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ConfigManager from '../../common/config-manager';
import { ButtonElementRenderFunction, ProjectInfoInterface, SectionInterface } from '../../common/types';
import Section from '../../components/layout/section';
import PageLayout from '../../components/layout/page-layout';
import PageHead from '../../components/seo/page-head';
import Heading from '../../components/text/heading';
import { Article } from '../../components/text/article';
import GhostButtonLink from '../../components/links/ghost-button-link';
import ContactForm from '../../components/input/contact-form';
import ProjectCardGallery from '../../components/project-card-gallery';
import Timeline from '../../components/timeline';


interface IndexPageTemplatePropsInterface {
	pageContext: {
		pinnedRepos: ProjectInfoInterface[];
	};
}

export default function IndexPageTemplate({ pageContext }: IndexPageTemplatePropsInterface) {
	const titleLayoutId = 'title-layout';
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const jobs = configManager.getJobs();
	const inViewTriggerRef = useRef(null);
	const isTitleExpanded = useInView(inViewTriggerRef, {
		amount: 0,
		margin: '-70px',
	});
	const sections = [
		{
			id: 'about',
			title: 'About',
			ref: useRef(null),
		},
		{
			id: 'projects',
			title: 'Projects',
			renderButton: useCallback((remainingProps => (
				<GhostButtonLink
					text="View more on GitHub"
					icon={faArrowUpRightFromSquare}
					to={siteMetadata.author.link.github}
					responsive flip
					{...remainingProps} />
			)) as ButtonElementRenderFunction, []),
			ref: useRef(null),
		},
		{
			id: 'experience',
			title: 'Experience',
			renderButton: useCallback((remainingProps => (
				<GhostButtonLink
					text="View more on LinkedIn"
					icon={faArrowUpRightFromSquare}
					to={siteMetadata.author.link.linkedin}
					responsive flip
					{...remainingProps} />
			)) as ButtonElementRenderFunction, []),
			ref: useRef(null),
		},
		{
			id: 'contact',
			title: 'Contact',
			ref: useRef(null),
		}
	] as SectionInterface[];
	const titleElement = (
		<Heading className="m-4 text-6xl">
			<span className="inline md:hidden">{siteMetadata.author.name.short}</span>
			<span className="hidden md:inline">{siteMetadata.author.name.full}</span>
		</Heading>
	);
	let titleWrapperElement = (
		<a href="/" className="z-20 opacity-0">
			{titleElement}
		</a>
	);

	if (isTitleExpanded) {
		titleWrapperElement = (
			<motion.a href="/" className="z-20" layoutId={titleLayoutId}>
				{titleElement}
			</motion.a>
		);
	}

	return (
		<PageLayout siteMetadata={siteMetadata} titleLayoutId={titleLayoutId} isTitleExpanded={isTitleExpanded} sections={sections}>
			<Section className="text-center min-h-svh">
				<span ref={inViewTriggerRef} />
				{titleWrapperElement}
				<span className="m-4">
					{siteMetadata.tagline}
				</span>
				<div className="flex fixed inset-x-0 bottom-0 flex-row justify-center mb-4">
					<GhostButtonLink
						to={`#${sections[0].id}`}
						icon={faAngleDown}
						tooltipText={`Go to ${sections[0].title} section`}
						className={isTitleExpanded ? '' : 'opacity-0'}
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
			<Section className="min-h-lvh" {...sections[1]}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section className="min-h-lvh" {...sections[2]}>
				<Timeline roles={jobs} />
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
	const configManager = new ConfigManager();
	const siteMetadata = configManager.getMetadata();
	const pageMetadata = {
		title: siteMetadata.title,
		description: siteMetadata.description,
		shortDescription: siteMetadata.shortDescription,
		path: location.pathname,
		ogImageUrl: new URL(siteMetadata.ogImagePath, siteMetadata.siteUrl).toString(),
		ogImageAltText: siteMetadata.ogImageAltText,
		structuredData: {
			'@type': 'WebSite',
			name: siteMetadata.title,
			description: siteMetadata.description,
			url: siteMetadata.siteUrl,
		}
	};

	return (
		<PageHead pageMetadata={pageMetadata} />
	);
}
