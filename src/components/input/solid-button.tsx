/*
	A bordered button with optional text/icon
	-----------------------------------------
*/

import type { ButtonInterface } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import Card from '../card';
import BaseButton from './base-button';

interface SolidButtonInterface extends ButtonInterface {
	cardClassName?: string;
}

export default function SolidButton({
	className = '',
	cardClassName = '',
	disabled,
	...remainingProps
}: SolidButtonInterface) {
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
