/*
	Reusable tooltip component
	--------------------------
*/

import type { PropsWithChildren } from 'react';
import { type PropsWithClassName, TooltipPosition } from '../common/types';
import { getClassNameProps } from '../common/utilities';

// Types

export interface Props extends PropsWithClassName, PropsWithChildren {
	text: string | number;
	position?: TooltipPosition;
}

// Constants

const POSITION_CLASS_MAP = {
	[TooltipPosition.Left]: '!tooltip-left',
	[TooltipPosition.Right]: '!tooltip-right',
	[TooltipPosition.Top]: '!tooltip-top',
	[TooltipPosition.Bottom]: '!tooltip-bottom',
};

export function Tooltip({
	className,
	text,
	position = TooltipPosition.Top,
	children,
}: Props) {
	const classNameProps = getClassNameProps(
		'mouse-only:tooltip mouse-only:[--tooltip-color:oklch(var(--b1)/1)] mouse-only:[--tooltip-text-color:oklch(var(--bc)/1)] hover:before:delay-1000 hover:after:delay-1000 hover:before:shadow-md',
		POSITION_CLASS_MAP[position],
		className,
	);

	return (
		<div data-tip={text} {...classNameProps}>
			{children}
		</div>
	);
}
