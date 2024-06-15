/*
	A borderless button with optional text/icon
	-------------------------------------------
*/

import type { Button } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import BaseButton from './base-button';

export default function GhostButton({
	className = '',
	disabled,
	...remainingProps
}: Button) {
	const classNameProps = getClassNameProps(
		'p-2 sm:p-4 drop-shadow',
		!disabled && 'interactive-text', // Enable hover effect only when button is not disabled
		className,
	);

	return <BaseButton {...{ disabled, ...classNameProps, ...remainingProps }} />;
}
