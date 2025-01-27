/*
	A collection of resume entries for roles
	----------------------------------------
*/

import type { Role } from '../../types/content/roles.ts';
import { isDefined } from '../../utils/other.ts';
import { ResumeDetailEntry } from './detail-entry.tsx';

interface Props {
	roles: Role[];
}

export function ResumeRoleEntries({ roles }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{roles.map((role) => {
				const tagsProp = isDefined(role.category)
					? { tags: [role.category] }
					: {};

				return (
					<ResumeDetailEntry
						key={role.startDate.toString()}
						title={role.title}
						subtitle={role.company}
						subtitleUrl={role.companyUrl}
						subtitleTooltip="View organization website"
						bullets={role.bullets}
						startDate={role.startDate}
						endDate={role.endDate}
						location={role.location}
						{...tagsProp}
					/>
				);
			})}
		</div>
	);
}
