/*
	Pill widget
	-----------
*/


import React from 'react';
import { Span } from '../components/text-components';


interface PillPropsInterface {
	className?: string;
	text: string;
}

export default function Pill({ className = '', text }: PillPropsInterface) {
	return (
		<div key={text} className={`inline-block size-fit px-3 py-2 rounded-lg drop-shadow-sm ${className}`}>
			<Span>{text}</Span>
		</div>
	);
}
