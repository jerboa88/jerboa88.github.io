/*
	Template used to generate the landing page
	------------------------------------------
*/


import React from 'react';
import { Section, Layout } from '../components/layout-components';
import { H1, P, S } from '../components/text-components';
import ProjectCardGallery from '../components/project-card-gallery';
import { ProjectInfoInterface } from '../common/types';
import * as styles from '../styles/index.module.css';


interface HomePropsInterface {
	pageContext: {
		pinnedRepos: ProjectInfoInterface[];
	};
}

export default function Home({ pageContext }: HomePropsInterface) {
	return (
		<Layout>
			<Section>
				<S className="absolute top-0">Space is cool, but cats are cooler (sorry Elon)</S>
				<H1>John Goodliff</H1>
				<P>Software Developer & Student</P>
			</Section>
			<Section title="About">
				I am a passionate Computing Science student working towards my Bachelors Specialization at the University of Alberta. I have recently completed my internship at Haemonetics Corporation in Edmonton, where I put my expertise to use on their NexLynk Donor Management System. Some of my interests include cats, cars, music, and of course, anything technology-related :)
			</Section>
			<Section title="Projects" className={styles.projectsSection}>
				<ProjectCardGallery projects={pageContext.pinnedRepos} />
			</Section>
			<Section title="Some Other Stuff">
			</Section>
		</Layout>
	);
}
