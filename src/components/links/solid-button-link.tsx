/*
	A text-only button link with a border
	-------------------------------------
*/


import React from 'react';
import LinkWrapper from './link-wrapper';


interface SolidButtonLinkPropsInterface {
	className?: string;
	disabled?: boolean;
	text: string;
	to: string;
	isInternal?: boolean;
	rel?: string;
}

export default function SolidButtonLink({ className = '', disabled = false, text, to, isInternal, rel }: SolidButtonLinkPropsInterface) {
	const enabledStyles = disabled ? '' : 'interactive-card';

	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<button className={`px-4 sm:px-8 py-2 text-center text-sm font-button uppercase bg-base-200 border-2 border-base-content/10 rounded-lg drop-shadow-sm ${enabledStyles} ${className}`}>
				{text}
			</button>
		</LinkWrapper>
	);
}
