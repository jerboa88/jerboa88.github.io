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
			<Card>
				<div className={`flex z-10 flex-col justify-between items-start p-6 align-middle size-full text-ellipsis group`}>
					<div className="flex flex-row justify-between items-center pr-2 w-full">
						<Pill text={repo.typeName} className={projectTypeColor} />
						<GhostButton icon={faGithub} className={`!p-0 m-0 ${showOnCardHoverStyles}`} disabled />
					</div>
					<div className="flex flex-row justify-center w-full">
						{/* TODO: Put project icon here? */}
						{/* <img src={getProjectImage(repo.imageUrl)}/> */}
						<div className={`flex flex-col justify-center p-8 px-10 h-full rounded-2xl z-16 text-wrap`}>
							<SubsectionHeading className="font-semibold">
								{repo.name}
							</SubsectionHeading>
							<span className="text-wrap">
								{repo.shortDesc}
							</span>
						</div>
					</div>
					<div className="flex flex-row justify-between items-center pr-2 w-full">
						<div className="flex flex-row gap-2 justify-start items-center">
							{
								repo.languages.map(language => <Pill key={language.name} className={`border ${showOnCardHoverStyles}`} text={language.name} />)
							}
						</div>
						<GhostButton icon={faStar} text={repo.stargazers} className="!p-0" iconClassName="text-xl" textClassName="font-bold" disabled />
					</div>
				</div>
			</Card>
		</LinkWrapper>
	);
}
