/*
	Level 1 heading text. Used for the page title
	---------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import { getClassNameProps } from '../../common/utils/other';
import type { PropsWithClassName } from '../../types/components';

interface Props extends PropsWithClassName, PropsWithChildren {}

export function Heading({ className, children }: Props) {
	const classNameProps = getClassNameProps(
		'align-middle font-heading font-bold uppercase dark:drop-shadow interactive-text text-neutral-content',
		className,
	);

	return <h1 {...classNameProps}>{children}</h1>;
}
