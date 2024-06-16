/*
	A wrapper component that conditionally renders a Gatsby Link or an anchor tag around its children
	-------------------------------------------------------------------------------------------------
*/

import { Link as GatsbyLink } from 'gatsby';
import type { PropsWithChildren } from 'react';
import type { Link, PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends Link, PropsWithClassName, PropsWithChildren {}

export function LinkWrapper({
	className = '',
	to,
	isInternal = false,
	rel = '',
	children,
}: Props) {
	const classNameProps = getClassNameProps('whitespace-nowrap', className);

	return isInternal ? (
		<GatsbyLink to={to} {...classNameProps}>
			{children}
		</GatsbyLink>
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
