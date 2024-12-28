/*
	Tag widget
	----------
*/

import type { PropsWithClassName } from '../types/components.ts';
import { getClassNameProps } from '../utils/other.ts';

interface Props extends PropsWithClassName {
	text: string;
}

export function Tag({ className, text }: Props) {
	const classNameProps = getClassNameProps(
		'kbd kbd-sm px-1.5 py-0.5 rounded-md font-button text-sm z-20',
		className,
	);

	return (
		<span key={text} {...classNameProps}>
			{text}
		</span>
	);
}
