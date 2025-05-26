/*
	A wrapper component that conditionally renders a Gatsby Link or an anchor tag around its children
	-------------------------------------------------------------------------------------------------
*/

import { Link as GatsbyLink } from 'gatsby';
import type { PropsWithChildren } from 'react';
import type { Link } from '../../types/components.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';

interface Props extends Link, PropsWithClassName, PropsWithChildren {}

export function LinkWrapper({
	className,
	to,
	isInternal = false,
	rel = '',
	ariaLabel,
	ariaDescription,
	children,
}: Props) {
	const classNameProps = getClassNameProps(className);

	return isInternal ? (
		<GatsbyLink
			to={to}
			rel={rel}
			aria-label={ariaLabel}
			aria-description={ariaDescription}
			{...classNameProps}
		>
			{children}
		</GatsbyLink>
	) : (
		// biome-ignore lint/a11y/useValidAriaProps: aria-description is a draft rn but will likely be added to the spec
		<a
			href={to}
			target="_blank"
			rel={`noopener external ${rel}`}
			aria-label={ariaLabel}
			aria-description={ariaDescription}
			{...classNameProps}
		>
			{children}
		</a>
	);
}
