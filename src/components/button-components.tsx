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
		<button className={`inline-block m-4 p-4 rounded-full ${enabledStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}


interface CornerIconButtonPropsInterface {
	className?: string;
	direction: 'tl' | 'tr' | 'bl' | 'br';
	icon: any;
	disabled?: boolean
}

export function CornerIconButton({ className = '', direction, icon, disabled = false }: CornerIconButtonPropsInterface) {
	const borderRadiusStyles = {
		'tl': 'top-0 left-0 pt-6 pl-6 rounded-br-full bg-gradient-to-tl',
		'tr': 'top-0 right-0 pt-6 pr-6 rounded-bl-full bg-gradient-to-tr',
		'bl': 'bottom-0 left-0 pb-6 pl-6 rounded-tr-full bg-gradient-to-bl',
		'br': 'bottom-0 right-0 pb-6 pr-6 rounded-tl-full bg-gradient-to-br'
	}[direction];
	const enabledStyles = disabled ? '' : 'hover:bg-white/20 transition-colors duration-200';

	return (
		<button className={`inline-block absolute p-10 ${borderRadiusStyles} from-transparent via-transparent to-black/50 ${enabledStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} className='block w-4 fa-lg fa-fw drop-shadow' />
		</button>
	);
}
