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
import SubsectionHeading from './text/subsection-heading';
import LinkWrapper from './links/link-wrapper';
import GhostButton from './input/ghost-button';
import { P } from './text-components';
import Pill from './pill';
import Card from './card';


interface ProjectCardPropsInterface {
	repo: ProjectInfoInterface;
}

export default function ProjectCard({ repo }: ProjectCardPropsInterface) {
	const showOnCardHoverStyles = 'opacity-0 mouse-only:group-hover:opacity-100 transition-opacity transition-200';
	const configManager = new ConfigManager();
	const projectTypeColor = configManager.getProjectTypeColor(repo.typeName);

	return (
		<LinkWrapper to={repo.githubUrl}>
			<Card className={`size-full p-4 flex flex-col justify-between items-start align-middle text-ellipsis z-10 group mouse-only:hover:${projectTypeColor}/75`}>
				<div className="flex flex-row justify-between items-center w-full">
					<Pill text={repo.typeName} className={projectTypeColor} />
					<GhostButton icon={faGithub} className={`m-0 ${showOnCardHoverStyles}`} disabled />
				</div>
				<div className="flex flex-row justify-center w-full">
					{/* TODO: Put project icon here? */}
					{/* <img src={getProjectImage(repo.imageUrl)}/> */}
					<div className={`flex flex-col z-16 h-full p-8 justify-center text-wrap rounded-2xl px-10`}>
						<SubsectionHeading className="font-semibold">
							{repo.name}
						</SubsectionHeading>
						<P className={`origin-center mx-0 my-0`}>
							{repo.shortDesc}
						</P>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center w-full">
					<div className="flex flex-row justify-start items-center gap-2">
						{
							repo.languages.map(language => <Pill key={language.name} className={`border ${showOnCardHoverStyles}`} text={language.name} />)
						}
					</div>
					<div className="flex flex-row items-center">
						<GhostButton icon={faStar} text={repo.stargazers} iconClassName="mb-1 text-xl" textClassName="font-bold" disabled />
					</div>
				</div>
			</Card>
		</LinkWrapper>
	);
}
