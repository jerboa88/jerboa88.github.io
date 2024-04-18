/*
	An inline link component
	------------------------
*/


import React from 'react';
import { LinkInterface, PropsWithClassName } from '../../common/types';
import LinkWrapper from './link-wrapper';


interface InlineLinkPropsInterface extends PropsWithClassName, LinkInterface {
	text: string;
}

export default function InlineLink({ className, text, to, isInternal, rel }: InlineLinkPropsInterface) {
	return (
		<LinkWrapper {...{ text, to, isInternal, rel }} className={`pb-0.5 font-semibold transition-colors border-b-[1px] border-primary hover:border-secondary ${className}`}>
			{text}
		</LinkWrapper>
	);
}
