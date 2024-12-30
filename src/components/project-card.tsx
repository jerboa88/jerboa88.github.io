/*
	Container for a project card and its title
	------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import { PROJECTS_PATH } from '../config/constants.ts';
import type { PropsWithClassName } from '../types/components.ts';
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

function getViewSourceButton(
	project: Project,
	classNameProps: PropsWithClassName,
) {
	if (!project.url) {
		return null;
	}

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

export function ProjectCard({ project }: Props) {
	const viewSourceClassNameProps = getClassNameProps(
		'!p-0 m-0',
		SHOW_ON_CARD_HOVER_STYLES,
	);
	const languagePillClassNameProps = getClassNameProps(
		'border',
		SHOW_ON_CARD_HOVER_STYLES,
	);
	const viewSourceButton = getViewSourceButton(
		project,
		viewSourceClassNameProps,
	);

	// Double negation is used for stargazerCount because 0 is evaluated as true for some reason
	const cardElement = (
		<Card outerClassName="size-full">
			<div className="flex flex-col justify-between items-start p-6 align-middle size-full text-ellipsis group">
				<div className="flex flex-row justify-between items-center pr-2 w-full">
					<Pill
						text={project.category.name ?? 'Unknown'}
						className={project.category.color}
					/>
					{viewSourceButton}
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
					<div className="flex flex-row gap-2 justify-start items-center flex-wrap">
						{project.languages.map((language) => (
							<Pill
								key={language}
								text={language}
								{...languagePillClassNameProps}
							/>
						))}
					</div>
					{!!project.stargazerCount && (
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
					)}
				</div>
			</div>
		</Card>
	);

	if (!project.url) {
		return cardElement;
	}

	return (
		<LinkWrapper to={`${PROJECTS_PATH}/${project.slug}`} isInternal>
			{cardElement}
		</LinkWrapper>
	);
}
