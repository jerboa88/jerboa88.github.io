/**
 * A responsive text component that displays different substrings depending on the screen width
 */

import { Breakpoint } from '../../types/components';

// Types

interface Props {
	text: string;
	breakpoints: {
		[Breakpoint.Default]: number;
		[Breakpoint.Sm]?: number | undefined;
		[Breakpoint.Md]?: number | undefined;
		[Breakpoint.Lg]?: number | undefined;
		[Breakpoint.Xl]?: number | undefined;
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
	const breakpointKeys: Breakpoint[] = Object.keys(breakpoints).map(Number);

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
