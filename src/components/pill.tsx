/*
	Pill widget
	-----------
*/

import type { PropsWithClassName } from '../types/components.ts';
import { getClassNameProps } from '../utils/other.ts';

interface Props extends PropsWithClassName {
	text: string;
}

export function Pill({ className, text }: Props) {
	const classNameProps = getClassNameProps(
		'inline-block size-fit px-4 py-3 rounded-lg drop-shadow-sm shadow-emboss z-20 text-sm font-button',
		className,
	);

	return (
		<div key={text} {...classNameProps}>
			{text}
		</div>
	);
}
