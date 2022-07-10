/*
	Pill widget
	-----------
*/


import React from 'react';
import { P } from '../components/text-components';


interface PillPropsInterface {
	className?: string;
	text: string;
	color: string;
}

export default function Pills({ className = '', text, color }: PillPropsInterface) {
	return (
		<div key={text} className={`inline-block px-3 py-2 rounded-full drop-shadow-sm ${className}`} style={{ background: `${color}` }}>
			<P className='block m-0'>{text}</P>
		</div>
	);
}
