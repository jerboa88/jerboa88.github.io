/*
	A borderless button with optional text/icon
	-------------------------------------------
*/

import type { Button } from '../../types/components.ts';
import { getClassNameProps, isDefined } from '../../utils/other.ts';
import { BaseButton } from './base-button.tsx';

export function GhostButton({
	className,
	disabled,
	...remainingProps
}: Button) {
	const classNameProps = getClassNameProps(
		'p-2 sm:p-4 dark:drop-shadow',
		!disabled && 'interactive-text', // Enable hover effect only when button is not disabled
		className,
	);
	const disabledProp = isDefined(disabled) ? { disabled } : {};

	return (
		<BaseButton
			{...{ ...disabledProp, ...classNameProps, ...remainingProps }}
		/>
	);
}
