/*
	Reusable tooltip component
	--------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utilities';


interface TooltipPropsInterface extends PropsWithClassName, PropsWithChildren {
	text: string;
}

export default function Tooltip({ className, children, text }: TooltipPropsInterface) {
	const classNameProps = getClassNameProps(
		'mouse-only:tooltip mouse-only:[--tooltip-color:oklch(var(--b1)/1)] mouse-only:[--tooltip-text-color:oklch(var(--bc)/1)] hover:before:delay-1000 hover:after:delay-1000 hover:before:shadow-md',
		className,
	);

	return (
		<div data-tip={text} {...classNameProps}>
			{children}
		</div>
	);
}
