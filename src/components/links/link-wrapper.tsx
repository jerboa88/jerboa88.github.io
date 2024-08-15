/*
	A wrapper component that conditionally renders a Gatsby Link or an anchor tag around its children
	-------------------------------------------------------------------------------------------------
*/

import { Link as GatsbyLink } from 'gatsby';
import type { PropsWithChildren } from 'react';
import { getClassNameProps } from '../../common/utils/other';
import type { Link } from '../../types/components';
import type { PropsWithClassName } from '../../types/components';

interface Props extends Link, PropsWithClassName, PropsWithChildren {}

export function LinkWrapper({
	className,
	to,
	isInternal = false,
	rel = '',
	children,
}: Props) {
	const classNameProps = getClassNameProps(className);

	return isInternal ? (
		<GatsbyLink to={to} rel={rel} {...classNameProps}>
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
