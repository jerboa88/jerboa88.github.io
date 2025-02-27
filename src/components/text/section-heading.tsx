/*
	Level 2 heading text. Used for section titles
	---------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';

interface Props extends PropsWithClassName, PropsWithChildren {}

export function SectionHeading({ className, children }: Props) {
	const classNameProps = getClassNameProps(
		'py-4 text-3xl align-middle font-heading font-medium dark:drop-shadow',
		className,
	);

	return <h2 {...classNameProps}>{children}</h2>;
}
