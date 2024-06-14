/*
	A wrapper component that conditionally renders a Gatsby Link or an anchor tag around its children
	-------------------------------------------------------------------------------------------------
*/

import { Link } from 'gatsby';
import type { PropsWithChildren } from 'react';
import type { LinkInterface, PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends LinkInterface, PropsWithClassName, PropsWithChildren {}

export default function LinkWrapper({
	className = '',
	to,
	isInternal = false,
	rel = '',
	children,
}: Props) {
	const classNameProps = getClassNameProps('whitespace-nowrap', className);

	return isInternal ? (
		<Link to={to} {...classNameProps}>
			{children}
		</Link>
	) : (
		<a
			href={to}
			target="_blank"
			rel={`noopener external ${rel}`}
			{...classNameProps}
		>
			{children}
		</a>
	);
}
