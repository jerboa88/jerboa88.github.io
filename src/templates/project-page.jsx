// Template used to generate individual project pages
// Use function for this component because it doesn't use state
import React from 'react';
import { Layout } from '../components/layout-components';
import { H2, P } from '../components/text-components';
import getProjectImage from '../common/utilities';


export default function ProjectPage(props) {
	return (
		<Layout>
			<img src={getProjectImage(props.pageContext.imageUrl)} width='500' alt=''></img>
			<H2>{props.pageContext.name}</H2>
			<P>{props.pageContext.shortDesc}</P>
			<P>{props.pageContext.typeName}</P>
			<P>{props.pageContext.typeColor}</P>
			<a href={props.pageContext.homepageUrl}>{props.pageContext.homepageUrl}</a><br />
			{/* TODO: Change this property from url to githubUrl. Does this work? */}
			<a href={props.pageContext.githubUrl}>{props.pageContext.githubUrl}</a>
			<P>{props.pageContext.stargazers}</P>
			<P>{props.pageContext.updatedAt}</P>
			<P>{props.pageContext.license}</P>
			<P>{props.pageContext.name}</P>
			<P>{props.pageContext.longDesc}</P>
			{/* {console.log(this.props.pageContext.rawReadme)} */}
		</Layout>
	);
}
