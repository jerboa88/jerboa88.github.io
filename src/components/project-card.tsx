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
import { IconButton } from '../components/button-components';


interface ProjectCardPropsInterface {
	repo: ProjectInfoInterface;
}

export default function ProjectCard({ repo }: ProjectCardPropsInterface) {
	const showOnCardHoverStyles = 'opacity-0 group-hover:opacity-100 transition-opacity';
	
	return (
		<Link to={`/${repo.slug}`} className='group'>
			{/* TODO: Use pointer-events-none to disable Link element before card is fully flipped. May need to add an event listener on to know when card has finished flipping? Or prevent default on first tap event */}
			{/* TODO: Move Link element to cardBack component instead? */}
			{/* TODO: Add events for touch */}
			<div role='presentation' className={`flex flex-col items-start w-full h-full text-ellipsis text-left relative z-10 justify-between align-middle bg-transparent border border-2 border-base-content/10 rounded-2xl overflow-hidden transition duration-500 group-hover:bg-[--card-bg] group-hover:scale-105`} style={{ '--card-bg': `${repo.typeColor}aa` }}>
				<div className='flex flex-row justify-between items-center w-full'>
					<Pill className='m-4' text={repo.typeName} color={repo.typeColor} />
					<IconButton icon={faGithub} className={showOnCardHoverStyles} disabled />
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
					<div className='flex flex-row justify-start items-center mx-4 gap-2'>
						{
							repo.languages.map(language => <Pill key={language.name} className={`border ${showOnCardHoverStyles}`} text={language.name} color='transparent' />)
						}
					</div>
					<div className='flex flex-row items-center mx-4'>
						<IconButton icon={faStar} className='mr-0 pr-3' disabled />
						<Span className='mr-2 mt-0.5'>{repo.stargazers}</Span>
					</div>
				</div>
			</div>
		</Link >
	);
}
