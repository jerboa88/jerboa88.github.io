/*
	A collection of resume entries for projects
	-------------------------------------------
*/

import type { SentenceString } from '../common/types';
import { toSentence } from '../common/utils';
import { ResumeEntry } from './resume-entry';

interface Props {
	githubRepos: Queries.GithubRepo[];
}

export function ResumeProjectEntries({ githubRepos }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{githubRepos.map((githubRepo) => {
				const descriptionSentences: SentenceString[] = [
					toSentence(githubRepo.description),
				];

				if (githubRepo.commentary) {
					descriptionSentences.push(toSentence(githubRepo.commentary));
				}

				return (
					<ResumeEntry
						key={githubRepo.slug}
						title={githubRepo.name}
						titleUrl={githubRepo.url}
						titleTooltip="View project on GitHub"
						tagline={githubRepo.languages.join(', ')}
						bullets={[descriptionSentences.join(' ') as SentenceString]}
						// bullets={bullet}
						startDate={new Date(githubRepo.createdAt)}
						endDate={new Date(githubRepo.updatedAt)}
					/>
				);
			})}
		</div>
	);
}
