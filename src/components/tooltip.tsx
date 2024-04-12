/*
	Reusable tooltip component
	--------------------------
*/


import React, { PropsWithChildren } from 'react';


interface TooltipPropsInterface extends PropsWithChildren {
	className?: string;
	text: string;
}

export default function Tooltip({ className, children, text }: TooltipPropsInterface) {
	return (
		<div className={`mouse-only:tooltip hover:before:delay-1000 hover:after:delay-1000 ${className}`} data-tip={text}>
			{children}
		</div>
	);
}
