/*
	Container for a project card and its title
	------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodeFork, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import { PROJECTS_PATH } from '../config/constants.ts';
import { type Project, ProjectType } from '../types/content/projects.ts';
import { assertUnreachable, getClassNameProps } from '../utils/other.ts';
import { Card } from './card.tsx';
import { GhostButton } from './input/ghost-button.tsx';
import { LinkWrapper } from './links/link-wrapper.tsx';
import { Pill } from './pill.tsx';
import { SubsectionHeading } from './text/subsection-heading.tsx';

// Types

interface Props {
	project: Project;
}

// Constants

const SHOW_ON_CARD_HOVER_STYLES =
	'opacity-0 mouse-only:group-hover:opacity-100 transition-opacity transition-200';

// Functions

function ViewSourceButton({ project }: Props) {
	if (!project.url) {
		return null;
	}

	const classNameProps = getClassNameProps(
		'!p-0 m-0',
		SHOW_ON_CARD_HOVER_STYLES,
	);

	switch (project.type) {
		case ProjectType.GithubRepo:
			return (
				<GhostButton
					isNotInteractive
					icon={faGithub}
					tooltipText={`View ${project.name} on GitHub`}
					{...classNameProps}
					disabled
				/>
			);

		case ProjectType.Other:
			return (
				<GhostButton
					isNotInteractive
					icon={faGlobe}
					tooltipText={'View project page'}
					{...classNameProps}
					disabled
				/>
			);

		default:
			assertUnreachable(project);
	}
}

function LanguagePills({ languages }: Pick<Project, 'languages'>) {
	const classNameProps = getClassNameProps('border', SHOW_ON_CARD_HOVER_STYLES);

	return (
		<div className="flex flex-row gap-2 justify-start items-center flex-wrap">
			{languages.map((language) => (
				<Pill key={language} text={language} {...classNameProps} />
			))}
		</div>
	);
}

function StargazerCountBadge({ project }: Props) {
	// Hide if undefined or 0 stars
	if (!project.stargazerCount) {
		return null;
	}

	return (
		<GhostButton
			isNotInteractive
			icon={faStar}
			text={project.stargazerCount}
			className="!p-0"
			iconClassName="text-xl"
			textClassName="font-bold"
			tooltipText="Number of stars"
			disabled
		/>
	);
}

function ForkCountBadge({ project }: Props) {
	// Hide if undefined or 0 forks
	if (!('forkCount' in project) || project.forkCount === 0) {
		return null;
	}

	return (
		<GhostButton
			isNotInteractive
			icon={faCodeFork}
			text={project.forkCount}
			className={`!p-0 ${SHOW_ON_CARD_HOVER_STYLES}`}
			iconClassName="text-xl"
			textClassName="font-bold"
			tooltipText="Number of forks"
			disabled
		/>
	);
}

export function ProjectCard({ project }: Props) {
	const cardContentsElement = (
		<div className="flex flex-col justify-between items-start p-6 align-middle size-full text-ellipsis group">
			<div className="flex flex-row justify-between items-center pr-2 w-full">
				<Pill
					text={project.category.name ?? 'Unknown'}
					className={project.category.color}
				/>
				<ViewSourceButton project={project} />
			</div>
			<div className="flex flex-row justify-center w-full">
				<div className="flex flex-col justify-center gap-4 p-10 h-full rounded-2xl z-16 text-wrap">
					<SubsectionHeading className="font-semibold">
						{project.name}
					</SubsectionHeading>
					<span className="text-wrap">{project.description}</span>
				</div>
			</div>
			<div className="flex flex-row justify-between items-center gap-2 pr-2 w-full">
				<LanguagePills languages={project.languages} />
				<div className="flex flex-row gap-6 justify-start items-center flex-wrap">
					<ForkCountBadge project={project} />
					<StargazerCountBadge project={project} />
				</div>
			</div>
		</div>
	);

	if (project.url) {
		return (
			<Card outerClassName="size-full">
				<LinkWrapper to={`${PROJECTS_PATH}/${project.slug}`} isInternal>
					{cardContentsElement}
				</LinkWrapper>
			</Card>
		);
	}

	return <Card outerClassName="size-full">{cardContentsElement}</Card>;
}
