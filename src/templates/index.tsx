/*
	Template used to generate the landing page
	------------------------------------------
*/


import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ConfigManager from '../common/config-manager';
import { ProjectInfoInterface, SectionInterface } from '../common/types';
import { getDefaultTransition } from '../common/utilities';
import { Section, PageLayout } from '../components/layout-components';
import { H1, P } from '../components/text-components';
import ProjectCardGallery from '../components/project-card-gallery';
import * as styles from '../styles/index.module.css';


interface HomePropsInterface {
	pageContext: {
		pinnedRepos: ProjectInfoInterface[];
	};
}

export default function Home({ pageContext }: HomePropsInterface) {
	const titleLayoutId = 'title-layout';
	const configManager = new ConfigManager();
	const metadata = configManager.getMetadata();
	const lightTheme = configManager.getTheme('light');
	const darkTheme = configManager.getTheme('dark');
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
			ref: useRef(null),
		},
		{
			id: 'experience',
			title: 'Experience',
			ref: useRef(null),
		},
		{
			id: 'contact',
			title: 'Contact',
			ref: useRef(null),
		}
	] as SectionInterface[];

	return (
		<PageLayout metadata={metadata} lightTheme={lightTheme} darkTheme={darkTheme} titleLayoutId={titleLayoutId} isTitleExpanded={isTitleExpanded} sections={sections}>
			<Section>
				{isTitleExpanded && <motion.a href="/" className="z-20" layoutId={titleLayoutId} {...getDefaultTransition()}>
					<H1 className="m-4 text-6xl">{metadata.author}</H1>
				</motion.a>}
				<span ref={inViewTriggerRef} />
				<P>Software Developer & Student</P>
			</Section>
			<Section {...sections[0]}>
				I am a passionate Computing Science student working towards my Bachelors Specialization at the University of Alberta. I have recently completed my internship at Haemonetics Corporation in Edmonton, where I put my expertise to use on their NexLynk Donor Management System. Some of my interests include cats, cars, music, and of course, anything technology-related :)
			</Section>
			<Section {...sections[1]} className={styles.projectsSection}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section {...sections[2]}>
				TODO
			</Section>
			<Section {...sections[3]}>
				TODO
			</Section>
		</PageLayout>
	);
}
