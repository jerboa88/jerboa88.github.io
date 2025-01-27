/*
	Displays a date range in human-readable format
	----------------------------------------------
*/

import type { PropsWithClassName } from '../../types/components.ts';
import type { Maybe } from '../../types/utils.ts';
import { getClassNameProps } from '../../utils/other.ts';

interface Props extends PropsWithClassName {
	startDate?: Maybe<Date>;
	endDate?: Maybe<Date>;
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
