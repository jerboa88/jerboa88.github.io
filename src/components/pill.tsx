/*
	Pill widget
	-----------
*/

import type { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utils';

interface Props extends PropsWithClassName {
	text: string;
}

export function Pill({ className, text }: Props) {
	const classNameProps = getClassNameProps(
		'inline-block size-fit px-3 py-2 rounded-lg drop-shadow-sm shadow-emboss',
		className,
	);

	return (
		<div key={text} {...classNameProps}>
			<span className="text-sm">{text}</span>
		</div>
	);
}
