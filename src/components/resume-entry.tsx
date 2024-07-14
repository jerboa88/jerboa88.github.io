/*
	A single resume entry for a role, project, etc.
	-----------------------------------------------
*/

import type {
	CityAndStateString,
	SentenceString,
	UrlString,
} from '../common/types';
import { LinkWrapper } from './links/link-wrapper';
import { Article } from './text/article';
import { DateRange } from './text/date-range';
import { SubsectionHeading } from './text/subsection-heading';

interface Props {
	title: Capitalize<string>;
	tagline: Capitalize<string>;
	bullets: SentenceString[];
	url?: UrlString;
	startDate?: Date;
	endDate?: Date;
	location?: CityAndStateString;
}

export function ResumeEntry({
	title,
	tagline,
	bullets,
	url,
	startDate,
	endDate,
	location,
}: Props) {
	return (
		<div className="flex flex-row justify-between items-start gap-4 break-inside-avoid-page">
			<div className="flex flex-col">
				<div className="flex flex-row items-center gap-4">
					<LinkWrapper to={url}>
						<SubsectionHeading>{title}</SubsectionHeading>
					</LinkWrapper>
					<span className="italic">{tagline}</span>
				</div>
				<Article>
					<ul>
						{bullets.map((bullet) => (
							<li key={bullet}>{bullet}</li>
						))}
					</ul>
				</Article>
			</div>
			<div>
				<div className="max-lg:pl-1 flex flex-col items-end">
					<DateRange
						startDate={startDate}
						endDate={endDate}
						className="text-nowrap"
					/>
					{location && <span>{location}</span>}
				</div>
			</div>
		</div>
	);
}
