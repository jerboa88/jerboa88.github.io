/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import { getClassNameProps } from '../../common/utils';
import {
	type ButtonElementRenderFunction,
	type PropsWithClassName,
	TooltipPosition,
} from '../../types/types';
import { SectionHeading } from '../text/section-heading';

interface Props extends PropsWithClassName, PropsWithChildren {
	title: string;
	renderButton?: ButtonElementRenderFunction | undefined;
}

export function SectionHeader({ className, title, renderButton }: Props) {
	const classNameProps = getClassNameProps(
		'w-full flex flex-row justify-between items-baseline',
		className,
	);
	const buttonElement = renderButton
		? renderButton({
				className: 'self-baseline',
				tooltipPosition: TooltipPosition.Left,
			})
		: undefined;

	return (
		<>
			<div {...classNameProps}>
				<SectionHeading>{title}</SectionHeading>
				{buttonElement}
			</div>
		</>
	);
}
