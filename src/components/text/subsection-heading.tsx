/*
	Level 3 heading text. Used for subsection/card titles
	-----------------------------------------------------
*/

import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren {}

export default function SubsectionHeading({ className = '', children }: Props) {
	const classNameProps = getClassNameProps(
		'my-4 text-lg font-heading font-semibold drop-shadow',
		className,
	);

	return <h3 {...classNameProps}>{children}</h3>;
}
