/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useRef } from 'react';
import type { HeadProps } from 'gatsby';
import { motion, useInView } from 'framer-motion';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ConfigManager from '../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../common/types';
import { getDefaultTransition } from '../common/utilities';
import Section from '../components/layout/section';
import PageLayout from '../components/layout/page-layout';
import SEO from '../components/layout/seo';
import { H1, P } from '../components/text-components';
import ProjectCardGallery from '../components/project-card-gallery';
import Timeline from '../components/timeline';


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
		margin: '-16%',
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
	];

	return (
		<PageLayout siteMetadata={siteMetadata} titleLayoutId={titleLayoutId} isTitleExpanded={isTitleExpanded} sections={sections}>
			<Section className="min-h-screen text-center">
				{isTitleExpanded && <motion.a href="/" className="z-20" layoutId={titleLayoutId} {...getDefaultTransition()}>
					<H1 className="m-4 text-6xl">{siteMetadata.author.name}</H1>
				</motion.a>}
				<span ref={inViewTriggerRef} />
				<P>{siteMetadata.tagline}</P>
			</Section>
			<Section className="min-h-screen" {...sections[0]}>
				I am a passionate Computing Science student working towards my Bachelors Specialization at the University of Alberta. I have recently completed my internship at Haemonetics Corporation in Edmonton, where I put my expertise to use on their NexLynk Donor Management System. Some of my interests include cats, cars, music, and of course, anything technology-related :)
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
