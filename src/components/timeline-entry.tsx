/*
	Individual entry for the timeline component
	-------------------------------------------
*/

import { faBuilding, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleTypeColor } from '../managers/config.ts';
import type { Role } from '../types/content/roles.ts';
import { getClassNameProps } from '../utils/other.ts';
import { Card } from './card.tsx';
import { Pill } from './pill.tsx';
import { DateRange } from './text/date-range.tsx';
import { SubsectionHeading } from './text/subsection-heading.tsx';

interface Props {
	role: Role;
}

export function TimelineEntry({ role }: Props) {
	const roleTypeColor = getRoleTypeColor(role.category);
	const pillClassNameProps = getClassNameProps('capitalize', roleTypeColor);

	return (
		<>
			<div className="timeline-start !m-0 pb-8 !row-start-2 !self-start w-fit flex flex-col justify-between items-start gap-4 max-lg:flex-row max-lg:w-full max-lg:items-center text-left">
				<div className="max-lg:pl-1">
					<DateRange startDate={role.startDate} endDate={role.endDate} />
					<span className="text-sm">{role.location}</span>
				</div>
				{role?.category && (
					<Pill text={role.category} {...pillClassNameProps} />
				)}
			</div>
			<div className="timeline-middle">
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<Card outerClassName="timeline-end mb-16" disabled>
				<div className="p-10">
					<div className="flex flex-row justify-between items-center mb-8">
						<div className="flex flex-col">
							<SubsectionHeading className="mr-2 mb-4">
								{role.title}
							</SubsectionHeading>
							<div className="flex flex-row items-center">
								<FontAwesomeIcon className="pr-2" icon={faBuilding} />
								<span className="text-sm italic">{role.company}</span>
							</div>
						</div>
					</div>
					<ul className="m-4">
						{role.bullets.map((bullet) => (
							<li key={bullet} className="list-rounded-square my-2">
								{bullet}
							</li>
						))}
					</ul>
				</div>
			</Card>
		</>
	);
}
