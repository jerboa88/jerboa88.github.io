/*
	A borderless button with optional text/icon
	-------------------------------------------
*/


import React from 'react';
import { ButtonInterface } from '../../common/types';
import ButtonBase from './button-base';


export default function GhostButton({ className = '', disabled, ...remainingProps }: ButtonInterface) {
	const buttonEnabledStyles = disabled ? '' : 'interactive-text';
	const buttonStyles = `p-2 sm:p-4 drop-shadow ${buttonEnabledStyles} ${className}`;

	return (
		<ButtonBase className={buttonStyles} disabled={disabled} {...remainingProps} />
	);
}
