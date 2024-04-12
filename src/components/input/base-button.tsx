/*
	A template for a responsive button with optional text/icon.
	This should not be used directly, but rather as a base for other button components.
	-----------------------------------------------------------------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonInterface } from '../../common/types';


export default function BaseButton({ className = '', type = 'button', iconClassName = '', textClassName = '', disabled = false, responsive = false, flip = false, icon, text }: ButtonInterface) {
	const buttonFlipStyles = flip ? 'flex-row-reverse' : '';
	const buttonStyles = `flex flex-row justify-center items-center self-center gap-2 text-sm font-button uppercase ${buttonFlipStyles} ${className}`;

	const iconOnlyStyles = text ? '' : 'text-xl';
	const iconStyles = `fa-fw ${iconOnlyStyles} ${iconClassName}`;

	const textResponsiveStyles = (responsive && icon) ? 'max-lg:hidden' : '';
	const textStyles = `${textResponsiveStyles} ${textClassName} `;

	return (
		<button type={type} disabled={disabled} className={buttonStyles} >
			{icon && <FontAwesomeIcon icon={icon} className={iconStyles} />}
			{text && <span className={textStyles}>{text}</span>}
		</button>
	);
}
