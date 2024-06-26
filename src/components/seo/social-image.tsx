/*
	A base component for building Open Graph image cards
	----------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren {
	size: {
		width: number;
		height: number;
	};
}

export function SocialImage({ className, size, children }: Props) {
	const classNameProps = getClassNameProps(
		'flex flex-col items-center size-full p-6 bg-glass overflow-hidden',
		className,
	);

	return (
		<div
			style={{ maxWidth: size.width, maxHeight: size.height }}
			className="fixed size-full bg-base-300"
		>
			<div {...classNameProps}>{children}</div>
		</div>
	);
}
