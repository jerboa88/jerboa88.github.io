/*
	A single resume entry for a role, project, etc.
	-----------------------------------------------
*/

import { TooltipPosition } from '../../types/components.ts';
import type {
	CityAndStateString,
	SentenceString,
	UrlString,
} from '../../types/strings.ts';
import { LinkWrapper } from '../links/link-wrapper.tsx';
import { Tags } from '../tags.tsx';
import { Article } from '../text/article.tsx';
import { DateRange } from '../text/date-range.tsx';
import { Tooltip } from '../tooltip.tsx';

interface Props {
	title: string;
	titleUrl?: UrlString;
	titleTooltip?: Capitalize<string>;
	tags: string | readonly string[];
	tagsUrl?: UrlString;
	tagsTooltip?: Capitalize<string>;
	bullets: SentenceString[];
	startDate?: Date;
	endDate?: Date;
	location?: CityAndStateString;
}

/**
 * Renders a list of tags or a tagline with an optional link
 *
 * @param tags A single tag or an array of tags
 * @param tagsUrl A URL to link the tagline to
 * @param tagsTooltip A tooltip to display when hovering over the tagline
 * @returns A JSX element containing the tagline or tags
 */
function getTaglineElement(
	tags: Props['tags'],
	tagsUrl?: Props['tagsUrl'],
	tagsTooltip?: Props['tagsTooltip'],
) {
	if (Array.isArray(tags)) {
		return <Tags titles={tags} />;
	}

	if (tagsUrl) {
		return (
			<Tooltip text={tagsTooltip ?? tagsUrl} position={TooltipPosition.Right}>
				<LinkWrapper to={tagsUrl}>
					<span className="text-base italic">{tags}</span>
				</LinkWrapper>
			</Tooltip>
		);
	}

	return <span className="text-base italic">{tags}</span>;
}

export function ResumeDetailEntry({
	title,
	titleUrl,
	titleTooltip,
	tags,
	tagsUrl,
	tagsTooltip,
	bullets,
	startDate,
	endDate,
	location,
}: Props) {
	const titleElement = titleUrl ? (
		<Tooltip text={titleTooltip ?? titleUrl} position={TooltipPosition.Right}>
			<LinkWrapper to={titleUrl}>
				<span className="font-bold text-balance">{title}</span>
			</LinkWrapper>
		</Tooltip>
	) : (
		<span className="font-bold text-balance">{title}</span>
	);
	const taglineElement = getTaglineElement(tags, tagsUrl, tagsTooltip);

	return (
		<div className="flex flex-row justify-between items-start gap-4 break-inside-avoid-page">
			<div className="flex flex-col gap-2 sm:gap-0">
				<div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
					{titleElement}
					{taglineElement}
				</div>
				<Article className="prose-li:m-0">
					<ul>
						{bullets.map((bullet) => (
							<li key={bullet} className="list-rounded-square">
								{bullet}
							</li>
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
