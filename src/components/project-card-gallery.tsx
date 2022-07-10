/*
	Container for project cards
	---------------------------
*/


import React from 'react';
import { ProjectInfoInterface } from '../common/types';
import ProjectCard from '../components/project-card';


interface ProjectCardGalleryPropsInterface {
	className?: string;
	projects: ProjectInfoInterface[];
}

export default function ProjectCardGallery({ className = '', projects }: ProjectCardGalleryPropsInterface) {
	return (
		<div className={`grid gap-10 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ${className}`}>
			{
				projects.map(repo => <ProjectCard key={repo.slug} repo={repo}></ProjectCard>)
			}
		</div>
	);
}
