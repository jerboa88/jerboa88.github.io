/*
	Level 2 heading text. Used for section titles
	---------------------------------------------
*/

import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren { }

export default function SectionHeading({ className = '', children }: Props) {
	const classNameProps = getClassNameProps(
		'py-4 text-3xl align-middle font-heading font-medium drop-shadow',
		className,
	);

	return <h2 {...classNameProps}>{children}</h2>;
}
