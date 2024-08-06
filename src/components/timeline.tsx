/*
	Vertical timeline widget
	------------------------
*/

import { getClassNameProps } from '../common/utils';
import type { Role } from '../types/types';
import { TimelineEntry } from './timeline-entry';

interface Props {
	roles: Role[];
}

const HR_ELEMENT = (
	<hr
		{...getClassNameProps(
			'mx-10 bg-primary',
			'first:rounded-b-full last:rounded-t-full last:shadow-emboss first:shadow-emboss-none',
			'group-first:rounded-t-full group-last:rounded-b-full',
		)}
	/>
);

export function Timeline({ roles }: Props) {
	return (
		<ul className="timeline timeline-vertical timeline-snap-icon max-lg:timeline-compact">
			{roles.map((role) => {
				return (
					<li key={`${role.startDate}-${role.company}`} className="group">
						{HR_ELEMENT}
						<TimelineEntry role={role} />
						{HR_ELEMENT}
					</li>
				);
			})}
		</ul>
	);
}
