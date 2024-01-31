import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


// Exports

interface IconButtonPropsInterface {
	className?: string;
	icon: IconDefinition;
}

export function IconButton({ className = '', icon }: IconButtonPropsInterface) {
	return (
		<button className={`inline-block p-4 transition-transform hover:scale-110 active:scale-90 ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}
