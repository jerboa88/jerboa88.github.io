/*
	A collection of resume entries for roles
	----------------------------------------
*/

import type { Role } from '../types/types';
import { ResumeEntry } from './resume-entry';

interface Props {
	roles: Role[];
}

export function ResumeRoleEntries({ roles }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{roles.map((role) => {
				const title =
					`${role.title} ${role?.type ? `(${role.type})` : ''}` as typeof role.title;

				return (
					<ResumeEntry
						key={role.title}
						title={title}
						tagline={role.company}
						taglineUrl={role.companyUrl}
						taglineTooltip="View company website"
						bullets={role.bullets}
						startDate={role.startDate}
						endDate={role.endDate}
						location={role.location}
					/>
				);
			})}
		</div>
	);
}
