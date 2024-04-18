/*
	Individual entry for the timeline component
	-------------------------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoleInterface } from '../common/types';
import ConfigManager from '../common/config-manager';
import { Span } from './text-components';
import SubsectionHeading from './text/subsection-heading';
import DateRange from './text/date-range';
import Pill from './pill';
import Card from './card';



interface TimelineEntryPropsInterface {
	role: RoleInterface;
}

export default function TimelineEntry({ role }: TimelineEntryPropsInterface) {
	const configManager = new ConfigManager();
	const roleTypeColor = configManager.getRoleTypeColor(role.type);

	return (
		<>
			<div className="timeline-start !m-0 px-8 pb-8 !row-start-2 !self-start flex flex-col max-lg:flex-row w-fit max-lg:w-full justify-between gap-4 items-start max-lg:items-center text-left">
				<div>
					<DateRange startDate={role.startDate} endDate={role.endDate} />
					<Span>
						{role.location}
					</Span>
				</div>
				<Pill text={role.type} className={`capitalize ${roleTypeColor}`} />
			</div>
			<div className="timeline-middle">
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<Card className="mt-0 mr-0 ml-8 mb-8 p-8 timeline-box timeline-end" disabled >
				<div className="flex flex-row mb-8 justify-between items-center">
					<div className="flex flex-col">
						<SubsectionHeading className="mt-0 mr-2">
							{role.title}
						</SubsectionHeading>
						<div className="flex items-center">
							<FontAwesomeIcon className="pr-2" icon={faBuilding} />
							<Span className="italic">
								{role.company}
							</Span>
						</div>
					</div>
				</div>
				<ul className="list-[circle] m-4">
					{
						role.tasks.map((task, index) => <li key={index} className="my-2">{task}</li>)
					}
				</ul>
			</Card>
		</>
	);
}
