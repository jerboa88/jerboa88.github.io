/*
	Pill widget
	-----------
*/


import React from 'react';
import { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utilities';


interface PillPropsInterface extends PropsWithClassName {
	text: string;
}

export default function Pill({ className = '', text }: PillPropsInterface) {
	const classNameProps = getClassNameProps(
		'inline-block size-fit px-3 py-2 rounded-lg drop-shadow-sm',
		className,
	);

	return (
		<div key={text} {...classNameProps}>
			<span className="text-sm">
				{text}
			</span>
		</div>
	);
}
