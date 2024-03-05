/*
	Icon button
	-----------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface IconButtonPropsInterface {
	className?: string;
	icon: IconDefinition;
	disabled?: boolean;
}

export default function IconButton({ className = '', icon, disabled = false }: IconButtonPropsInterface) {
	const enabledStyles = disabled ? '' : 'interactive-scale';

	return (
		<button className={`inline-block p-2 sm:p-4 ${enabledStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}
