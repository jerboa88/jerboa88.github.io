/*
	A collection of resume entries for projects
	-------------------------------------------
*/

import type { Project } from '../../types/content/projects.ts';
import { toSentence } from '../../utils/strings.ts';
import { ResumeDetailEntry } from './detail-entry.tsx';

interface Props {
	projects: Project[];
}

export function ResumeProjectEntries({ projects }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{projects.map((project) => {
				const expositionSentence = project.exposition
					? toSentence(project.exposition)
					: null;
				const descriptionSentence = toSentence(project.description);

				return (
					<ResumeDetailEntry
						key={project.slug}
						title={project.name}
						titleUrl={project.url}
						titleTooltip="View project on GitHub"
						tags={project.languages}
						bullets={[expositionSentence ?? descriptionSentence]}
						endDate={new Date(project.createdAt)}
					/>
				);
			})}
		</div>
	);
}
