/*
	Template used to generate individual project pages
	--------------------------------------------------
*/


import React from 'react';
import { Layout } from '../components/layout-components';
import { H2, P } from '../components/text-components';
import getProjectImage from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';


interface ProjectPagePropsInterface {
	pageContext: ProjectInfoInterface;
}

export default function ProjectPage({ pageContext }: ProjectPagePropsInterface) {
	return (
		<Layout>
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
		</Layout>
	);
}
