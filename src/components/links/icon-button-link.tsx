/*
	Icon button link
	----------------
*/


import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import LinkWrapper from './link-wrapper';
import IconButton from '../buttons/icon-button';


// Exports

interface IconButtonLinkPropsInterface {
	className?: string;
	icon: IconDefinition;
	to: string;
	isInternal?: boolean;
	rel?: string;
}

export default function IconButtonLink({ className = '', icon, to, isInternal, rel }: IconButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<IconButton className={className} icon={icon} />
		</LinkWrapper>
	);
}
