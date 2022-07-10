/*
	Icon button
	-----------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface IconButtonPropsInterface {
	className?: string;
	icon: any;
	disabled?: boolean
}

export default function IconButton({ className = '', icon, disabled = false }: IconButtonPropsInterface) {
	const enabledStyles = disabled ? '' : 'hover:bg-white/20 transition-colors duration-200';

	return (
		<button className={`inline-block m-4 p-4 rounded-full ${enabledStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}


{/* <button className={`inline-block m-4 px-3 py-2 rounded-full ${!props.disabled && 'hover:bg-white/20 transition-colors duration-200'} ${props.className || ''}`}>
<FontAwesomeIcon icon={props.icon} className='drop-shadow' />
</button> */}
