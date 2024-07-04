/*
	Container for a project card and its title
	------------------------------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import type { GithubRepo } from '../common/types';
import { getClassNameProps } from '../common/utilities';
import { Card } from './card';
import { GhostButton } from './input/ghost-button';
import { LinkWrapper } from './links/link-wrapper';
import { Pill } from './pill';
import { SubsectionHeading } from './text/subsection-heading';

// Types

interface Props {
	repo: GithubRepo;
}

// Constants

const SHOW_ON_CARD_HOVER_STYLES =
	'opacity-0 mouse-only:group-hover:opacity-100 transition-opacity transition-200';

export function ProjectCard({ repo }: Props) {
	const githubButtonClassNameProps = getClassNameProps(
		'!p-0 m-0',
		SHOW_ON_CARD_HOVER_STYLES,
	);
	const languagePillClassNameProps = getClassNameProps(
		'border',
		SHOW_ON_CARD_HOVER_STYLES,
	);

	const cardElement = (
		<Card outerClassName="size-full">
			<div className="flex flex-col justify-between items-start p-6 align-middle size-full text-ellipsis group">
				<div className="flex flex-row justify-between items-center pr-2 w-full">
					<Pill
						text={repo.type.name ?? 'Unknown'}
						className={repo.type.color}
					/>
					<GhostButton
						icon={faGithub}
						tooltipText={`View ${repo.name} on GitHub`}
						{...githubButtonClassNameProps}
						disabled
					/>
				</div>
				<div className="flex flex-row justify-center w-full">
					<div className="flex flex-col justify-center p-8 px-10 h-full rounded-2xl z-16 text-wrap">
						<SubsectionHeading className="my-4 font-semibold">
							{repo.name}
						</SubsectionHeading>
						<span className="text-wrap">{repo.shortDescription}</span>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center pr-2 w-full">
					<div className="flex flex-row gap-2 justify-start items-center">
						{repo.languages.map((language) => (
							<Pill
								key={language}
								text={language}
								{...languagePillClassNameProps}
							/>
						))}
					</div>
					{repo.stargazerCount && (
						<GhostButton
							icon={faStar}
							text={repo.stargazerCount}
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

	if (!repo.url) {
		return cardElement;
	}

	return <LinkWrapper to={repo.url}>{cardElement}</LinkWrapper>;
}
