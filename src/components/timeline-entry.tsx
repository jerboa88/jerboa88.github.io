/*
	Individual entry for the timeline component
	-------------------------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoleInterface } from '../common/types';
import { H3, Span } from '../components/text-components';
import DateRange from '../components/text/date-range';
import Pill from '../components/pill';


interface TimelineEntryPropsInterface {
	role: RoleInterface;
}

export default function TimelineEntry({ role }: TimelineEntryPropsInterface) {
	return (
		<>
			<div className="timeline-start !m-0 px-8 pb-8 !row-start-2 !self-start flex flex-col max-lg:flex-row w-fit max-lg:w-full justify-between gap-4 items-start max-lg:items-center text-left">
				<div>
					<DateRange startDate={role.startDate} endDate={role.endDate} />
					<Span>{role.location}</Span>
				</div>
				<Pill text={role.type} className="w-fit capitalize" />
			</div>
			<div className="timeline-middle">
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<div className="!m-0 !ml-8 !mb-8 p-8 bg-base-200 border-2 border-base-content/10 rounded-2xl overflow-hidden timeline-box timeline-end text-left">
				<div className="flex flex-row mb-8 justify-between items-center">
					<div className="flex flex-col">
						<H3 className="mt-0 mr-2">{role.title}</H3>
						<div className="flex items-center">
							<FontAwesomeIcon className="pr-2" icon={faBuilding} />
							<Span className="italic">{role.company}</Span>
						</div>
					</div>
				</div>
				<ul className="list-[circle] m-4">
					{
						role.tasks.map((task, index) => <li key={index}>{task}</li>)
					}
				</ul>
			</div >
		</>
	);
}