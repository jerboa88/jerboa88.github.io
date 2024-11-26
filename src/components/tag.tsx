/*
	Tag widget
	----------
*/

import { getClassNameProps } from '../common/utils/other.ts';
import type { PropsWithClassName } from '../types/components.ts';

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
