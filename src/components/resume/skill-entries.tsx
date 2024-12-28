/*
	A collection of resume entries for skills
	-----------------------------------------
*/

import type { SkillsConfig } from '../../types/content/skills.ts';
import { ResumeSummaryEntry } from './summary-entry.tsx';

interface Props {
	skills: SkillsConfig;
}

export function ResumeSkillEntries({ skills }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{Object.entries(skills).map(([skillType, skillList]) => (
				<ResumeSummaryEntry
					key={skillType}
					title={skillType}
					items={skillList}
				/>
			))}
		</div>
	);
}
