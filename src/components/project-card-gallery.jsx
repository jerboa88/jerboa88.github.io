// Container for project cards
// Use function for this component because it doesn't use state
import React from 'react';
import ProjectCard from '../components/project-card';


export default function ProjectCardGallery(props) {
	return (
		<div className={`grid gap-10 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ${props.className || ''}`}>
			{
				props.projects.map(repo => <ProjectCard key={repo.slug} repo={repo}></ProjectCard>)
			}
		</div>
	);
}
