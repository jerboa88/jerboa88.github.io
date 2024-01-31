/*
	Icon button
	-----------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


// Exports

interface IconButtonPropsInterface {
	className?: string;
	icon: IconDefinition;
	disabled?: boolean
}

export function IconButton({ className = '', icon, disabled = false }: IconButtonPropsInterface) {
	const enabledStyles = disabled ? '' : 'hover:bg-white/20 transition-colors duration-200';

	return (
		<button className={`inline-block p-4 rounded-full ${enabledStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}
