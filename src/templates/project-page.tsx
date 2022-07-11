/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React from 'react';
import ConfigManager from '../common/config-manager';
import { getProjectImage } from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';
import { PageLayout } from '../components/layout-components';
import { H2, P } from '../components/text-components';


interface ProjectPagePropsInterface {
	pageContext: ProjectInfoInterface;
}

export default function ProjectPage({ pageContext }: ProjectPagePropsInterface) {
	const configManager = new ConfigManager();
	const metadata = configManager.getMetadata();
	const lightTheme = configManager.getTheme('light');
	const darkTheme = configManager.getTheme('dark');

	return (
		<PageLayout metadata={metadata} lightTheme={lightTheme} darkTheme={darkTheme}>
			<img src={getProjectImage(pageContext.imageUrl)} width='500' alt=''></img>
			<H2>{pageContext.name}</H2>
			<P>{pageContext.shortDesc}</P>
			<P>{pageContext.typeName}</P>
			<P>{pageContext.typeColor}</P>
			<a href={pageContext.homepageUrl}>{pageContext.homepageUrl}</a><br />
			<a href={pageContext.githubUrl}>{pageContext.githubUrl}</a>
			<P>{pageContext.stargazers}</P>
			<P>{pageContext.updatedAt}</P>
			<P>{pageContext.license}</P>
			<P>{pageContext.name}</P>
			<P>{pageContext.longDesc}</P>
		</PageLayout>
	);
}
