/*
	Level 3 heading text. Used for subsection/card titles
	-----------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren {}

export function SubsectionHeading({ className, children }: Props) {
	const classNameProps = getClassNameProps(
		'text-lg font-heading font-semibold dark:drop-shadow',
		className,
	);

	return <h3 {...classNameProps}>{children}</h3>;
}
