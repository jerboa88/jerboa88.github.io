/*
	A bordered button with optional text/icon
	-----------------------------------------
*/

import type { Button } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import Card from '../card';
import BaseButton from './base-button';

// Types

interface SolidButton extends Button {
	cardClassName?: string;
}

export default function SolidButton({
	className = '',
	cardClassName = '',
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
