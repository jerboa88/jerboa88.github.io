/*
	A borderless button with optional text/icon
	-------------------------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Span } from '../text-components';


interface GhostButtonPropsInterface {
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

export default function GhostButton({ className = '', iconClassName = '', textClassName = '', disabled = false, responsive = false, flip = false, icon, text }: GhostButtonPropsInterface) {
	const enabledStyles = disabled ? '' : 'interactive-text';
	const flipStyles = flip ? 'flex-row-reverse' : '';
	const iconOnlyStyles = text ? '' : 'text-xl';
	const responsiveTextStyles = (responsive && icon) ? 'max-lg:hidden' : '';

	return (
		<button className={`flex flex-row items-center self-center gap-2 p-2 sm:p-4 text-sm font-button uppercase drop-shadow group ${enabledStyles} ${flipStyles} ${className}`}>
			{icon && <FontAwesomeIcon icon={icon} className={`fa-fw ${iconOnlyStyles} ${iconClassName}`} />}
			{text && <Span className={`${textClassName} ${responsiveTextStyles}`}>{text}</Span>}
		</button>
	);
}
