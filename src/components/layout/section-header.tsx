/*
	Header text and optional button link for a page section
	-------------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import {
	type ButtonElementRenderFn,
	TooltipPosition,
} from '../../types/components.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import type { Maybe } from '../../types/utils.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { SectionHeading } from '../text/section-heading.tsx';

interface Props extends PropsWithClassName, PropsWithChildren {
	headingClassName?: string;
	title: string;
	renderButton?: Maybe<ButtonElementRenderFn>;
}

export function SectionHeader({
	className,
	headingClassName,
	title,
	renderButton,
}: Props) {
	const classNameProps = getClassNameProps(
		'w-full flex flex-row justify-between items-baseline',
		className,
	);
	const headingClassNameProps = getClassNameProps(headingClassName);
	const buttonElement = renderButton
		? renderButton({
				className: 'self-baseline',
				tooltipPosition: TooltipPosition.Left,
			})
		: null;

	return (
		<div {...classNameProps}>
			<SectionHeading {...headingClassNameProps}>{title}</SectionHeading>
			{buttonElement}
		</div>
	);
}
