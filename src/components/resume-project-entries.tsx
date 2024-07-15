/*
	A collection of resume entries for projects
	-------------------------------------------
*/

import { ResumeEntry } from './resume-entry';

interface Props {
	githubRepos: Queries.GithubRepo[];
}

export function ResumeProjectEntries({ githubRepos }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{githubRepos.map((githubRepo) => (
				<ResumeEntry
					key={githubRepo.slug}
					title={githubRepo.name}
					titleUrl={githubRepo.url}
					titleTooltip="View project on GitHub"
					tagline={githubRepo.languages.join(', ')}
					bullets={[githubRepo.description]}
					startDate={new Date(githubRepo.createdAt)}
					endDate={new Date(githubRepo.updatedAt)}
				/>
			))}
		</div>
	);
}
