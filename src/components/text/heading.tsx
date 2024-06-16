/*
	Level 1 heading text. Used for the page title
	---------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren {}

export function Heading({ className, children }: Props) {
	const classNameProps = getClassNameProps(
		'align-middle font-heading font-bold uppercase drop-shadow interactive-text',
		className,
	);

	return <h1 {...classNameProps}>{children}</h1>;
}
