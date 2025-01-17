/*
	A bordered button with optional text/icon
	-----------------------------------------
*/

import type { Button } from '../../types/components.ts';
import { getClassNameProps, isDefined } from '../../utils/other.ts';
import { Card } from '../card.tsx';
import { BaseButton } from './base-button.tsx';

// Types

interface SolidButton extends Button {
	cardClassName?: string;
}

export function SolidButton({
	className,
	cardClassName,
	disabled,
	...remainingProps
}: SolidButton) {
	const classNameProps = getClassNameProps('px-4 py-3 sm:px-8', className);
	const cardOuterClassNameProp = isDefined(cardClassName)
		? { outerClassName: cardClassName }
		: {};
	const disabledProp = isDefined(disabled) ? { disabled } : {};

	return (
		<Card
			middleClassName="rounded-lg"
			innerClassName="rounded-lg"
			{...cardOuterClassNameProp}
			{...disabledProp}
		>
			<BaseButton
				{...{ ...disabledProp, ...classNameProps, ...remainingProps }}
			/>
		</Card>
	);
}
