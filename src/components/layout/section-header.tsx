/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import { getClassNameProps } from '../../common/utils/other';
import {
	type ButtonElementRenderFunction,
	TooltipPosition,
} from '../../types/components';
import type { PropsWithClassName } from '../../types/components';
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
