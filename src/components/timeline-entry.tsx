/*
	Individual entry for the timeline component
	-------------------------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoleInterface } from '../common/types';
import { getClassNameProps } from '../common/utilities';
import SubsectionHeading from './text/subsection-heading';
import DateRange from './text/date-range';
import Pill from './pill';
import Card from './card';
import { getRoleTypeColor } from '../common/config-manager';


interface Props {
	role: RoleInterface;
}

export default function TimelineEntry({ role }: Props) {
	const roleTypeColor = getRoleTypeColor(role.type);
	const pillClassNameProps = getClassNameProps('capitalize', roleTypeColor);

	return (
		<>
			<div className="timeline-start !m-0 pb-8 !row-start-2 !self-start w-fit flex flex-col justify-between items-start gap-4 max-lg:flex-row max-lg:w-full max-lg:items-center text-left">
				<div className="max-lg:pl-1">
					<DateRange startDate={role.startDate} endDate={role.endDate} />
					<span className="text-sm">
						{role.location}
					</span>
				</div>
				<Pill text={role.type} {...pillClassNameProps} />
			</div>
			<div className="timeline-middle">
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<Card outerClassName="timeline-end mb-16" disabled>
				<div className="p-10">
					<div className="flex flex-row justify-between items-center mb-8">
						<div className="flex flex-col">
							<SubsectionHeading className="mt-0 mr-2">
								{role.title}
							</SubsectionHeading>
							<div className="flex flex-row items-center">
								<FontAwesomeIcon className="pr-2" icon={faBuilding} />
								<span className="text-sm italic">
									{role.company}
								</span>
							</div>
						</div>
					</div>
					<ul className="list-[circle] m-4">
						{
							role.tasks.map((task, index) => (
								<li key={index} className="my-2">
									{task}
								</li>
							))
						}
					</ul>
				</div>
			</Card>
		</>
	);
}
