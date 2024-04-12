/*
	A bordered button with optional text/icon
	-----------------------------------------
*/


import React from 'react';
import { ButtonInterface } from '../../common/types';
import ButtonBase from './button-base';


export default function SolidButton({ className = '', disabled, ...remainingProps }: ButtonInterface) {
	const buttonEnabledStyles = disabled ? '' : 'interactive-card';
	const buttonStyles = `px-4 sm:px-8 py-2 bg-base-200 border-2 border-base-content/10 rounded-lg shadow-md ${buttonEnabledStyles} ${className}`;

	return (
		<ButtonBase className={buttonStyles} disabled={disabled} {...remainingProps} />
	);
}
