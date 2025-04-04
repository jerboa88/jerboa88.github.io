/*
	A collection of resume entries for projects
	-------------------------------------------
*/

import type { Project } from '../../types/content/projects.ts';
import { isDefined } from '../../utils/other.ts';
import { toSentence } from '../../utils/strings.ts';
import { ResumeDetailEntry } from './detail-entry.tsx';

interface Props {
	projects: Project[];
}

export function ResumeProjectEntries({ projects }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{projects.map((project) => {
				const titleUrlProp = isDefined(project.url)
					? { titleUrl: project.url }
					: {};
				const subtitleProp = isDefined(project.category.name)
					? { subtitle: project.category.name }
					: {};
				const backgroundSentence = project.background
					? toSentence(project.background)
					: null;
				const descriptionSentence = toSentence(project.description);

				return (
					<ResumeDetailEntry
						key={project.slug}
						title={project.name}
						titleTooltip="View project on GitHub"
						tags={project.languages}
						bullets={[backgroundSentence ?? descriptionSentence]}
						endDate={new Date(project.createdAt)}
						{...titleUrlProp}
						{...subtitleProp}
					/>
				);
			})}
		</div>
	);
}
