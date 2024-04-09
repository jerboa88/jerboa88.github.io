/*
	A bordered button with optional text/icon
	-----------------------------------------
*/


import React from 'react';
import ButtonBase from './button-base';
import { ButtonInterface } from '../../common/types';


export default function SolidButton({ className = '', iconClassName, textClassName, icon, text, disabled, responsive, flip }: ButtonInterface) {
	const buttonEnabledStyles = disabled ? '' : 'interactive-card';
	const buttonStyles = `px-4 sm:px-8 py-2 bg-base-200 border-2 border-base-content/10 rounded-lg shadow-md ${buttonEnabledStyles} ${className}`;

	return (
		<ButtonBase className={buttonStyles} {...{ iconClassName, textClassName, disabled, responsive, flip, icon, text }} />
	);
}
