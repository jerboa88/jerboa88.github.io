/*
	Pill widget
	-----------
*/


import React from 'react';
import { PropsWithClassName } from '../common/types';


interface PillPropsInterface extends PropsWithClassName {
	text: string;
}

export default function Pill({ className = '', text }: PillPropsInterface) {
	return (
		<div key={text} className={`inline-block size-fit px-3 py-2 rounded-lg drop-shadow-sm ${className}`}>
			<span className="text-sm">
				{text}
			</span>
		</div>
	);
}
