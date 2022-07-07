// Pill widget
// Use function for this component because it doesn't use state
import React from 'react';
import { P } from '../components/text-components';


export default function Pills(props) {
	return (
		<div key={props.text} className={`inline-block px-3 py-2 rounded-full drop-shadow-sm ${props.className || ''}`} style={{ background: `${props.color}` }}>
			<P className='block m-0'>{props.text}</P>
		</div>
	);
}
