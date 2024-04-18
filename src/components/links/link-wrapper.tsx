/*
	A wrapper component that conditionally renders a Gatsby Link or an anchor tag around its children
	-------------------------------------------------------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';
import { LinkInterface, PropsWithClassName } from '../../common/types';


interface LinkWrapperProps extends LinkInterface, PropsWithClassName, PropsWithChildren { }

export default function LinkWrapper({ className = '', to, isInternal = false, rel = '', children }: LinkWrapperProps) {
	const styles = `link no-underline whitespace-nowrap ${className}`;

	if (isInternal) {
		return (
			<Link to={to} className={styles}>
				{children}
			</Link>
		);
	}

	return (
		<a className={styles} href={to} target="_blank" rel={`noopener external ${rel}`}>
			{children}
		</a>
	);
}
