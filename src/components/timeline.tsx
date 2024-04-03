/*
	Vertical timeline widget
	------------------------
*/


import React from 'react';
import { RoleInterface } from '../common/types';
import TimelineEntry from './timeline-entry';


interface TimelinePropsInterface {
	roles: RoleInterface[];
}

export default function Timeline({ roles }: TimelinePropsInterface) {
	const lastIndex = roles.length - 1;

	return (
		<ul className="timeline timeline-vertical timeline-snap-icon max-lg:timeline-compact">
			{
				roles.map((entry, index) => (
					<li key={index}>
						<hr className={`bg-primary rounded-b-full ${index === 0 ? 'rounded-t-full' : ''}`} />
						<TimelineEntry role={entry} />
						<hr className={`bg-primary rounded-t-full ${index === lastIndex ? 'rounded-b-full' : ''}`} />
					</li>
				))
			}
		</ul>
	);
}
