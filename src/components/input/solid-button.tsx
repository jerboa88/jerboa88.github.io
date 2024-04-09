/*
	A bordered button with optional text/icon
	-----------------------------------------
*/


import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Span } from '../text-components';


interface SolidButtonLinkPropsInterface {
	className?: string;
	iconClassName?: string;
	textClassName?: string;
	disabled?: boolean;
	responsive?: boolean;
	icon?: IconDefinition;
	text?: string;
	flip?: boolean;
	key?: string;
}

export default function SolidButtonLink({ className = '', iconClassName = '', textClassName = '', disabled = false, responsive = false, flip = false, icon, text }: SolidButtonLinkPropsInterface) {
	const enabledStyles = disabled ? '' : 'interactive-card';
	const flipStyles = flip ? 'flex-row-reverse' : '';
	const iconOnlyStyles = text ? '' : 'text-xl';
	const responsiveTextStyles = (responsive && icon) ? 'max-lg:hidden' : '';

	return (
		<button className={`flex flex-row justify-center items-center self-center gap-2 px-4 sm:px-8 py-2 text-sm font-button uppercase bg-base-200 border-2 border-base-content/10 rounded-lg shadow-md ${enabledStyles} ${flipStyles} ${className}`}>
			{icon && <FontAwesomeIcon icon={icon} className={`fa-fw ${iconOnlyStyles} ${iconClassName}`} />}
			{text && <Span className={`${textClassName} ${responsiveTextStyles}`}>{text}</Span>}
		</button>
	);
}
