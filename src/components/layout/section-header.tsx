/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { ButtonElementRenderFunction, PropsWithClassName, TooltipPosition } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import SectionHeading from '../text/section-heading';
import Divider from '../divider';


interface SectionHeaderPropsInterface extends PropsWithClassName, PropsWithChildren {
	title: string;
	renderButton?: ButtonElementRenderFunction;
}

export default function SectionHeader({ className, title, renderButton }: SectionHeaderPropsInterface) {
	const classNameProps = getClassNameProps(
		'w-full flex flex-row justify-between items-baseline',
		className,
	);
	const buttonElement = renderButton ? renderButton({
		className: 'self-baseline',
		tooltipPosition: TooltipPosition.Left,
	}) : (
		undefined
	);

	return (
		<>
			<div {...classNameProps}>
				<SectionHeading>
					{title}
				</SectionHeading>
				{buttonElement}
			</div>
			<Divider className="pb-8" />
		</>
	);
}
