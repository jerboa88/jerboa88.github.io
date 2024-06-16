/*
	Displays a date range in human-readable format
	----------------------------------------------
*/

import type { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName {
	startDate: Date;
	endDate: Date;
}

export function DateRange({ className = '', startDate, endDate }: Props) {
	const classNameProps = getClassNameProps('font-bold', className);

	const startMonth = startDate.toLocaleString('default', { month: 'long' });
	const endMonth = endDate.toLocaleString('default', { month: 'long' });
	const startYear = startDate.getFullYear();
	const endYear = endDate.getFullYear();
	const startDateString = `${startMonth} ${startYear === endYear ? '' : startYear}`;
	const endDateString = `${endMonth} ${endYear}`;

	return (
		<div {...classNameProps}>
			<time dateTime={startDate.toISOString()}>{startDateString}</time>
			<span> - </span>
			<time dateTime={endDate.toISOString()}>{endDateString}</time>
		</div>
	);
}
