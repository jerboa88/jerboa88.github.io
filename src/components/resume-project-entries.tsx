/*
	A collection of resume entries for projects
	-------------------------------------------
*/

import { toSentence } from '../common/utils';
import { ResumeEntry } from './resume-entry';

interface Props {
	githubRepos: Queries.GithubRepo[];
}

export function ResumeProjectEntries({ githubRepos }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{githubRepos.map((githubRepo) => {
				const expositionSentence = githubRepo.exposition
					? toSentence(githubRepo.exposition)
					: null;
				const descriptionSentence = toSentence(githubRepo.description);

				return (
					<ResumeEntry
						key={githubRepo.slug}
						title={githubRepo.name}
						titleUrl={githubRepo.url}
						titleTooltip="View project on GitHub"
						tagline={githubRepo.languages.join(', ')}
						bullets={[expositionSentence ?? descriptionSentence]}
						endDate={new Date(githubRepo.createdAt)}
					/>
				);
			})}
		</div>
	);
}
