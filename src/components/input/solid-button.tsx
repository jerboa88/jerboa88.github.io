/*
	A bordered button with optional text/icon
	-----------------------------------------
*/

import { getClassNameProps } from '../../common/utils';
import type { Button } from '../../types/types';
import { Card } from '../card';
import { BaseButton } from './base-button';

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

	return (
		<Card
			outerClassName={cardClassName}
			middleClassName="rounded-lg"
			innerClassName="rounded-lg"
			disabled={disabled}
		>
			<BaseButton {...{ disabled, ...classNameProps, ...remainingProps }} />
		</Card>
	);
}
