/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { motion, useInView } from 'framer-motion';
import { faAngleDown, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ConfigManager from '../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../common/types';
import { getDefaultTransition } from '../common/utilities';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import { H1, P } from '../components/text-components';
import ProjectCardGallery from '../components/project-card-gallery';
import Timeline from '../components/timeline';
import ButtonLink from '../components/links/button-link';
import Tooltip from '../components/tooltip';


interface HomePropsInterface {
	pageContext: {
		pinnedRepos: ProjectInfoInterface[];
	};
}

export default function Home({ pageContext }: HomePropsInterface) {
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
		<H1 className="m-4 text-6xl">
			<span className="inline md:hidden">{siteMetadata.author.name.short}</span>
			<span className="hidden md:inline">{siteMetadata.author.name.full}</span>
		</H1>
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
				<P>
					{siteMetadata.tagline}
				</P>
				<Tooltip text={`Go to ${sections[0].title} section`} className="fixed inset-x-0 bottom-0 mb-4 flex flex-row justify-center">
					<ButtonLink to={`#${sections[0].id}`} icon={faAngleDown} className={`transition ${isTitleExpanded ? '' : 'opacity-0'}`} isInternal />
				</Tooltip>
			</Section>
			<Section className="min-h-screen" {...sections[0]}>
				<p>
					I am a recent graduate with a Bachelors Specialization in Computing Science from the University of Alberta. During my time at the U of A, I had the opportunity to share my expertise with Haemonetics Corporation in Edmonton, where I was involved in end-to-end development of their NexLynk Donor Management System.
				</p>
				<br />
				<p>
					Having a natural interest in science has allowed me to become familiar with a wide variety of tech related subjects including programming, design, and audio production. I have experience with frontend web technologies, backend development, cloud computing, as well as low-level programming like Arduino and MIPS assembly.
				</p>
				<br />
				<p>
					Some of my extracurricular interests include cats, cars, and music!
				</p>
			</Section>
			<Section className="min-h-screen" {...sections[1]}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section className="min-h-screen" {...sections[2]}>
				<Timeline roles={jobs} />
			</Section>
			<Section className="min-h-screen" {...sections[3]}>
				TODO
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
