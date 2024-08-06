/*
	Displays a date range in human-readable format
	----------------------------------------------
*/

import { getClassNameProps } from '../../common/utils';
import type { PropsWithClassName } from '../../types/components';

interface Props extends PropsWithClassName {
	startDate?: Date | undefined;
	endDate?: Date | undefined;
}

export function DateRange({ className, startDate, endDate }: Props) {
	const classNameProps = getClassNameProps('text-base font-bold', className);

	const endMonth = endDate?.toLocaleString('default', { month: 'short' });
	const endYear = endDate?.getFullYear();
	const endDateString = `${endMonth} ${endYear}`;

	const startMonth = startDate?.toLocaleString('default', { month: 'short' });
	const startYear = startDate?.getFullYear();
	const startDateString = `${startMonth} ${startYear === endYear ? '' : startYear}`;

	return (
		<div {...classNameProps}>
			{startDate && (
				<>
					<time dateTime={startDate.toISOString()}>{startDateString}</time>
					<span> - </span>
					{!endDate && <time dateTime={new Date().toISOString()}>Present</time>}
				</>
			)}
			{endDate && <time dateTime={endDate.toISOString()}>{endDateString}</time>}
		</div>
	);
}
