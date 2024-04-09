/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/


import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import LinkWrapper from './link-wrapper';
import SolidButton from '../input/solid-button';


interface SolidButtonLinkPropsInterface {
	className?: string;
	iconClassName?: string;
	textClassName?: string;
	disabled?: boolean;
	icon?: IconDefinition;
	text?: string;
	responsive?: boolean;
	flip?: boolean;
	key?: string;
	to: string;
	isInternal?: boolean;
	rel?: string;
}

export default function SolidButtonLink({ className, iconClassName, textClassName, disabled, responsive, flip, icon, text, to, isInternal, rel }: SolidButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<SolidButton {...{ className, iconClassName, textClassName, disabled, responsive, flip, icon, text }} />
		</LinkWrapper>
	);
}
