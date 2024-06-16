/*
	Vertical timeline widget
	------------------------
*/

import type { Role } from '../common/types';
import { getClassNameProps } from '../common/utilities';
import { TimelineEntry } from './timeline-entry';

interface Props {
	roles: Role[];
}

export function Timeline({ roles }: Props) {
	const lastIndex = roles.length - 1;

	return (
		<ul className="timeline timeline-vertical timeline-snap-icon max-lg:timeline-compact">
			{roles.map((role, index) => {
				const hrStyles = getClassNameProps(
					'mx-10 bg-primary rounded-b-full',
					index === 0 && 'rounded-t-full', // hr styles for the first list item
					index === lastIndex && 'rounded-b-full', // hr styles for the last list item
				);

				return (
					<li key={`${role.startDate}-${role.company}`}>
						<hr {...hrStyles} />
						<TimelineEntry role={role} />
						<hr {...hrStyles} />
					</li>
				);
			})}
		</ul>
	);
}
