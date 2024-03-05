/*
	A text-only button link
	-----------------------
*/


import React from 'react';
import LinkWrapper from './link-wrapper';


interface TextButtonLinkPropsInterface {
	className?: string;
	disabled?: boolean;
	text: string;
	to: string;
	isInternal?: boolean;
	rel?: string;
	key?: string;
}

export default function TextButtonLink({ className = '', disabled = false, text, to, isInternal, rel }: TextButtonLinkPropsInterface) {
	const enabledStyles = disabled ? '' : 'interactive-scale';

	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel} className={`px-2 sm:px-4 text-sm font-button uppercase ${enabledStyles} ${className}`}>
			{text}
		</LinkWrapper>
	);
}
