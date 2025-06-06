/*
	A base component for building Open Graph image cards
	----------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { BaseLayout } from '../layout/base-layout.tsx';

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
		<BaseLayout>
			<div
				style={{ maxWidth: size.width, maxHeight: size.height }}
				className="fixed size-full"
			>
				<div {...classNameProps}>{children}</div>
			</div>
		</BaseLayout>
	);
}
