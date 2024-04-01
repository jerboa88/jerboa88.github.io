/*
	A button link with optional text/icon
	-------------------------------------
*/


import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import LinkWrapper from './link-wrapper';
import Button from '../button';


interface ButtonLinkPropsInterface {
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

export default function ButtonLink({ className, iconClassName, textClassName, disabled, responsive, flip, icon, text, to, isInternal, rel }: ButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel} className="contents">
			<Button {...{ className, iconClassName, textClassName, disabled, responsive, flip, icon, text }} />
		</LinkWrapper>
	);
}
