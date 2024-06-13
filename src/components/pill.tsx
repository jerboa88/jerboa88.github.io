/*
	Pill widget
	-----------
*/

import React from 'react';
import { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utilities';

interface Props extends PropsWithClassName {
	text: string;
}

export default function Pill({ className = '', text }: Props) {
	const classNameProps = getClassNameProps(
		'inline-block size-fit px-3 py-2 rounded-lg drop-shadow-sm',
		className,
	);

	return (
		<div key={text} {...classNameProps}>
			<span className="text-sm">{text}</span>
		</div>
	);
}
