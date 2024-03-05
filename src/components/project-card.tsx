/*
	Container for a project card and its title
	------------------------------------------
*/


import React from 'react';
import { Link } from 'gatsby';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { getProjectImage } from '../common/utilities';
import { ProjectInfoInterface } from '../common/types';
import { H3, P, Span } from '../components/text-components';
import Pill from '../components/pill';
import IconButton from '../components/buttons/icon-button';


interface ProjectCardPropsInterface {
	repo: ProjectInfoInterface;
}

export default function ProjectCard({ repo }: ProjectCardPropsInterface) {
	const showOnCardHoverStyles = 'opacity-0 group-hover:opacity-100 transition-opacity transition-200';

	return (
		<a href={repo.githubUrl} role='presentation' className='flex flex-col items-start w-full h-full p-4 text-ellipsis text-left relative z-10 justify-between align-middle bg-base-200 border-2 border-base-content/10 rounded-2xl overflow-hidden group duration-500 hover:bg-[--card-bg] interactive-scale' style={{ '--card-bg': `${repo.typeColor}aa` }}>
			<div className='flex flex-row justify-between items-center w-full'>
				<Pill text={repo.typeName} color={repo.typeColor} />
				<IconButton icon={faGithub} className={`m-0 ${showOnCardHoverStyles}`} disabled />
			</div>
			<div className='flex flex-row justify-center w-full'>
				{/* TODO: Put project icon here? */}
				{/* <img src={getProjectImage(repo.imageUrl)}/> */}
				<div className={`flex flex-col z-16 h-full p-8 justify-center rounded-2xl px-10`}>
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
						repo.languages.map(language => <Pill key={language.name} className={`border ${showOnCardHoverStyles}`} text={language.name} color='transparent' />)
					}
				</div>
				<div className='flex flex-row items-center'>
					<IconButton icon={faStar} className='mr-0 pr-3' disabled />
					<Span className='mr-2 mt-0.5'>{repo.stargazers}</Span>
				</div>
			</div>
		</a>
	);
}
