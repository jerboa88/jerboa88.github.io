/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { motion, useInView } from 'framer-motion';
import { faAngleDown, faArrowUpRightFromSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ConfigManager from '../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../common/types';
import { getDefaultTransition } from '../common/utilities';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import Heading from '../components/text/heading';
import ProjectCardGallery from '../components/project-card-gallery';
import Timeline from '../components/timeline';
import GhostButtonLink from '../components/links/ghost-button-link';
import Tooltip from '../components/tooltip';
import TextInput from '../components/input/text-input';
import MultilineTextInput from '../components/input/multiline-text-input';
import SolidButton from '../components/input/solid-button';
import { Article } from '../components/text/article';


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
			button: {
				text: 'View more on GitHub',
				icon: faArrowUpRightFromSquare,
				to: siteMetadata.author.link.github,
			},
			ref: useRef(null),
		},
		{
			id: 'experience',
			title: 'Experience',
			button: {
				text: 'View more on LinkedIn',
				icon: faArrowUpRightFromSquare,
				to: siteMetadata.author.link.linkedin,
			},
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
			<motion.a href="/" className="z-20" layoutId={titleLayoutId} {...getDefaultTransition()}>
				{titleElement}
			</motion.a>
		);
	}

	return (
		<PageLayout siteMetadata={siteMetadata} titleLayoutId={titleLayoutId} isTitleExpanded={isTitleExpanded} sections={sections}>
			<Section className="min-h-svh text-center">
				<span ref={inViewTriggerRef} />
				{titleWrapperElement}
				<span className="m-4">
					{siteMetadata.tagline}
				</span>
				<div className="fixed inset-x-0 bottom-0 mb-4 flex flex-row justify-center">
					<Tooltip text={`Go to ${sections[0].title} section`}>
						<GhostButtonLink to={`#${sections[0].id}`} icon={faAngleDown} className={`transition ${isTitleExpanded ? '' : 'opacity-0'}`} isInternal />
					</Tooltip>
				</div>
			</Section>
			<Section className="min-h-screen" {...sections[0]}>
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
			<Section className="min-h-screen" {...sections[1]}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section className="min-h-screen" {...sections[2]}>
				<Timeline roles={jobs} />
			</Section>
			<Section className="min-h-screen" {...sections[3]}>
				<div className="w-full flex flex-row justify-center">
					{/* TODO: Hook up this with a backend form provider */}
					<form action="TODO" method="post" className="w-full max-w-lg p-0 sm:p-8 flex flex-col gap-4">
						<TextInput name="name" label="Name" className="w-full" required />
						<TextInput name="email" label="Email" type="email" className="w-full" required />
						<MultilineTextInput name="message" label="Message" className="w-full" required />
						<SolidButton type="submit" icon={faPaperPlane} text="Send" className="w-full mt-2" />
					</form>
				</div>
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
		<SEO pageMetadata={pageMetadata} />
	);
}