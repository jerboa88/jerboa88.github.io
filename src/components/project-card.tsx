/*
	Container for a project card and its title
	------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import { PROJECTS_PATH } from '../common/constants';
import { assertUnreachable, getClassNameProps } from '../common/utils/other';
import type { PropsWithClassName } from '../types/components';
import { type Project, ProjectCategory } from '../types/projects';
import { Card } from './card';
import { GhostButton } from './input/ghost-button';
import { LinkWrapper } from './links/link-wrapper';
import { Pill } from './pill';
import { SubsectionHeading } from './text/subsection-heading';

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
		return <></>;
	}

	switch (project.category) {
		case ProjectCategory.GithubRepo:
			return (
				<GhostButton
					icon={faGithub}
					tooltipText={`View ${project.name} on GitHub`}
					{...classNameProps}
					disabled
				/>
			);

		case ProjectCategory.Other:
			return (
				<GhostButton
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
						text={project.type.name ?? 'Unknown'}
						className={project.type.color}
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
				<div className="flex flex-row justify-between items-center pr-2 w-full">
					<div className="flex flex-row gap-2 justify-start items-center">
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
