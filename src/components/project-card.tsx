/*
	Container for a project card and its title
	------------------------------------------
*/


import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ConfigManager from '../common/config-manager';
import { getProjectImage } from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';
import { H3, P, Span } from '../components/text-components';
import Pill from '../components/pill';
import LinkWrapper from './links/link-wrapper';
import Button from './button';


interface ProjectCardPropsInterface {
	repo: ProjectInfoInterface;
}

export default function ProjectCard({ repo }: ProjectCardPropsInterface) {
	const showOnCardHoverStyles = 'opacity-0 group-hover:opacity-100 transition-opacity transition-200';
	const configManager = new ConfigManager();
	const projectTypeColor = configManager.getProjectTypeColor(repo.typeName);

	return (
		<LinkWrapper to={repo.githubUrl} className={`flex flex-col items-start w-full h-full p-4 text-ellipsis text-left relative z-10 justify-between align-middle bg-base-200 border-2 border-base-content/10 rounded-2xl overflow-hidden group duration-500 interactive-scale hover:${projectTypeColor}/75`}>
			<div className='flex flex-row justify-between items-center w-full'>
				<Pill text={repo.typeName} className={projectTypeColor} />
				<Button icon={faGithub} className={`m-0 ${showOnCardHoverStyles}`} disabled />
			</div>
			<div className='flex flex-row justify-center w-full'>
				{/* TODO: Put project icon here? */}
				{/* <img src={getProjectImage(repo.imageUrl)}/> */}
				<div className={`flex flex-col z-16 h-full p-8 justify-center text-wrap rounded-2xl px-10`}>
					<H3 className="font-semibold">
						{repo.name}
					</H3>
					<P className={`origin-center mx-0 my-0`}>
						{repo.shortDesc}
					</P>
				</div>
			</div>
			<div className='flex flex-row justify-between items-center w-full'>
				<div className='flex flex-row justify-start items-center gap-2'>
					{
						repo.languages.map(language => <Pill key={language.name} className={`border ${showOnCardHoverStyles}`} text={language.name} />)
					}
				</div>
				<div className='flex flex-row items-center'>
					<Button icon={faStar} text={repo.stargazers.toString()} className="font-bold text-xl" iconClassName="mb-1" disabled />
				</div>
			</div>
		</LinkWrapper>
	);
}
