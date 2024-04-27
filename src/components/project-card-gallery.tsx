/*
	Container for project cards
	---------------------------
*/


import React from 'react';
import { ProjectInfoInterface, PropsWithClassName } from '../common/types';
import ProjectCard from '../components/project-card';


interface ProjectCardGalleryPropsInterface extends PropsWithClassName {
	projects: ProjectInfoInterface[];
}

export default function ProjectCardGallery({ className = '', projects }: ProjectCardGalleryPropsInterface) {
	return (
		<div className={`grid grid-flow-row-dense flex-1 w-full gap-10 grid-cols-1 xl:grid-cols-2 ${className}`}>
			{
				projects.map(repo => <ProjectCard key={repo.slug} repo={repo}></ProjectCard>)
			}
		</div>
	);
}
