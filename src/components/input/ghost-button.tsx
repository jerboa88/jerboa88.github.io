/*
	A borderless button with optional text/icon
	-------------------------------------------
*/

import { getClassNameProps } from '../../common/utils/other';
import type { Button } from '../../types/components';
import { BaseButton } from './base-button';

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

	return <BaseButton {...{ disabled, ...classNameProps, ...remainingProps }} />;
}
