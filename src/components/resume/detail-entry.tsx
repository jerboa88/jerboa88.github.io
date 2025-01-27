/*
	A single resume entry for a role, project, etc.
	-----------------------------------------------
*/

import {
	type PropsWithClassName,
	TooltipPosition,
} from '../../types/components.ts';
import type {
	CityAndStateString,
	SentenceString,
	UrlString,
} from '../../types/strings.ts';
import type { Maybe } from '../../types/utils.ts';
import { getClassNameProps, isDefined } from '../../utils/other.ts';
import { LinkWrapper } from '../links/link-wrapper.tsx';
import { Tags } from '../tags.tsx';
import { Article } from '../text/article.tsx';
import { DateRange } from '../text/date-range.tsx';
import { Tooltip } from '../tooltip.tsx';

// Types

interface Props {
	title: string;
	titleUrl?: UrlString;
	titleTooltip?: Capitalize<string>;
	subtitle?: string;
	subtitleUrl?: UrlString;
	subtitleTooltip?: Capitalize<string>;
	tags?: readonly string[];
	bullets: SentenceString[];
	startDate?: Date;
	endDate?: Date;
	location?: CityAndStateString;
}

interface TitleProps extends PropsWithClassName {
	title: Maybe<string>;
	titleUrl?: Maybe<UrlString>;
	titleTooltip?: Maybe<Capitalize<string>>;
}

// Functions

/**
 * A title for a resume entry. If a URL is provided, the title will be a link.
 *
 * @param className - The class name to apply to the title.
 * @param title - The title to display.
 * @param titleUrl - The URL to link to.
 * @param titleTooltip - The tooltip text to display when hovering over the title.
 * @returns
 */
function Title({ className, title, titleUrl, titleTooltip }: TitleProps) {
	if (!isDefined(title)) {
		return null;
	}

	const classNameProps = getClassNameProps(className);
	const titleElement = <span {...classNameProps}>{title}</span>;

	if (isDefined(titleUrl)) {
		return (
			<Tooltip text={titleTooltip ?? titleUrl} position={TooltipPosition.Right}>
				<LinkWrapper to={titleUrl}>{titleElement}</LinkWrapper>
			</Tooltip>
		);
	}

	return titleElement;
}

export function ResumeDetailEntry({
	title,
	titleUrl,
	titleTooltip,
	subtitle,
	subtitleUrl,
	subtitleTooltip,
	tags,
	bullets,
	startDate,
	endDate,
	location,
}: Props) {
	return (
		<div className="flex flex-row justify-between items-start gap-4 break-inside-avoid-page">
			<div className="flex flex-col gap-2 sm:gap-0">
				<div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
					<Title
						{...{ title, titleUrl, titleTooltip }}
						className="font-bold text-balance"
					/>
					<Title
						title={subtitle}
						titleUrl={subtitleUrl}
						titleTooltip={subtitleTooltip}
						className="text-base italic"
					/>
					{tags && tags.length > 0 && <Tags titles={tags} />}
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
