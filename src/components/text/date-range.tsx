/*
	Displays a date range in human-readable format
	----------------------------------------------
*/


import React from 'react';


interface DateRangePropsInterface {
	className?: string;
	startDate: Date;
	endDate: Date;
}

export default function DateRange({ className = '', startDate, endDate }: DateRangePropsInterface) {
	const startMonth = startDate.toLocaleString('default', { month: 'long' });
	const endMonth = endDate.toLocaleString('default', { month: 'long' });
	const startYear = startDate.getFullYear();
	const endYear = endDate.getFullYear();
	const startDateString = `${startMonth} ${(startYear === endYear) ? '' : startYear}`;
	const endDateString = `${endMonth} ${endYear}`;

	return (
		<div className="font-bold">
			<time dateTime={startDate.toISOString()}>
				{startDateString}
			</time>
			<span> - </span>
			<time dateTime={endDate.toISOString()}>
				{endDateString}
			</time>
		</div>
	);
}
