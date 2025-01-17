/*
	A collection of resume entries for roles
	----------------------------------------
*/

import type { Role } from '../../types/content/roles.ts';
import { ResumeDetailEntry } from './detail-entry.tsx';

interface Props {
	roles: Role[];
}

export function ResumeRoleEntries({ roles }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{roles.map((role) => {
				const title =
					`${role.title} ${role?.category ? `(${role.category})` : ''}` as typeof role.title;

				return (
					<ResumeDetailEntry
						key={role.title}
						title={title}
						tags={role.company}
						tagsUrl={role.companyUrl}
						tagsTooltip="View organization website"
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
