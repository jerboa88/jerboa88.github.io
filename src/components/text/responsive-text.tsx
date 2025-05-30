/**
 * A responsive text component that displays different substrings depending on the screen width
 */

import { Breakpoint } from '../../types/components.ts';
import type { Maybe } from '../../types/utils.ts';
import { keysOf } from '../../utils/other.ts';

// Types

interface Props {
	text: string;
	breakpoints: {
		[Breakpoint.Default]: number;
		[Breakpoint.Sm]?: Maybe<number>;
		[Breakpoint.Md]?: Maybe<number>;
		[Breakpoint.Lg]?: Maybe<number>;
		[Breakpoint.Xl]?: Maybe<number>;
	};
}

// Constants

const BREAKPOINT_CLASS_NAME_MAP = {
	[Breakpoint.Default]: 'inline',
	[Breakpoint.Sm]: 'hidden sm:inline',
	[Breakpoint.Md]: 'hidden md:inline',
	[Breakpoint.Lg]: 'hidden lg:inline',
	[Breakpoint.Xl]: 'hidden xl:inline',
};

// Component

export function ResponsiveText({ text, breakpoints }: Props) {
	const spanElements: React.JSX.Element[] = [];
	const breakpointKeys = keysOf(breakpoints);

	for (let i = 0; i < breakpointKeys.length; i++) {
		const previousBreakpoint = breakpointKeys[i - 1];
		const breakpoint = breakpointKeys[i];
		const stringIndex = breakpoints[previousBreakpoint] ?? 0;
		const nextStringIndex = breakpoints[breakpoint] ?? text.length;
		const currentText = text.slice(stringIndex, nextStringIndex);

		spanElements.push(
			<span key={breakpoint} className={BREAKPOINT_CLASS_NAME_MAP[breakpoint]}>
				{currentText}
			</span>,
		);
	}

	return <>{spanElements}</>;
}
