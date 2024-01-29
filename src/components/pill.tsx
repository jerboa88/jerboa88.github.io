/*
	Pill widget
	-----------
*/


import React from 'react';
import { P, Span } from '../components/text-components';


interface PillPropsInterface {
	className?: string;
	text: string;
	color: string;
}

export default function Pills({ className = '', text, color }: PillPropsInterface) {
	return (
		<div key={text} className={`inline-block px-3 py-2 rounded-lg drop-shadow-sm ${className}`} style={{ background: `${color}` }}>
			<Span>{text}</Span>
		</div>
	);
}
