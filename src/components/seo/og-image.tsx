/*
	A base component for building Open Graph image cards
	----------------------------------------------------
*/


import React, { PropsWithChildren } from 'react'
import { PropsWithClassName } from '../../common/types'
import { getClassNameProps } from '../../common/utilities'


interface Props extends PropsWithClassName, PropsWithChildren {
	size: {
		width: number;
		height: number;
	};
}


export default function SocialImage({ className, size, children }: Props) {
	const classNameProps = getClassNameProps(
		'flex flex-col items-center size-full p-6 bg-glass overflow-hidden',
		className,
	);

	return (
		<div style={{ maxWidth: size.width, maxHeight: size.height }} className="fixed size-full bg-base-300">
			<div {...classNameProps}>
				{children}
			</div>
		</div>
	)
}
