/*
	A single resume entry for a role, project, etc.
	-----------------------------------------------
*/

import {
	type CityAndStateString,
	type SentenceString,
	TooltipPosition,
	type UrlString,
} from '../common/types';
import { LinkWrapper } from './links/link-wrapper';
import { Article } from './text/article';
import { DateRange } from './text/date-range';
import { Tooltip } from './tooltip';

interface Props {
	title: Capitalize<string>;
	titleUrl?: UrlString;
	titleTooltip?: Capitalize<string>;
	tagline: Capitalize<string>;
	taglineUrl?: UrlString;
	taglineTooltip?: Capitalize<string>;
	bullets: SentenceString[];
	startDate?: Date;
	endDate?: Date;
	location?: CityAndStateString;
}

export function ResumeEntry({
	title,
	titleUrl,
	titleTooltip,
	tagline,
	taglineUrl,
	taglineTooltip,
	bullets,
	startDate,
	endDate,
	location,
}: Props) {
	const titleElement = titleUrl ? (
		<Tooltip text={titleTooltip ?? titleUrl} position={TooltipPosition.Right}>
			<LinkWrapper to={titleUrl}>
				<span className="font-bold">{title}</span>
			</LinkWrapper>
		</Tooltip>
	) : (
		<span className="font-bold">{title}</span>
	);
	const taglineElement = taglineUrl ? (
		<Tooltip
			text={taglineTooltip ?? taglineUrl}
			position={TooltipPosition.Right}
		>
			<LinkWrapper to={taglineUrl}>
				<span className="text-base italic">{tagline}</span>
			</LinkWrapper>
		</Tooltip>
	) : (
		<span className="text-base italic">{tagline}</span>
	);

	return (
		<div className="flex flex-row justify-between items-start gap-4 break-inside-avoid-page">
			<div className="flex flex-col">
				<div className="flex flex-row items-center gap-4">
					{titleElement}
					{taglineElement}
				</div>
				<Article className="prose-li:m-0">
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
					{location && <span className="text-base">{location}</span>}
				</div>
			</div>
		</div>
	);
}
