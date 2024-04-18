/*
	Level 1 heading text. Used for the page title
	---------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassname } from '../../common/types';


interface TextComponentPropsInterface extends PropsWithClassname, PropsWithChildren { }

export default function Heading({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h1 className={`align-middle font-heading font-bold uppercase drop-shadow interactive-text ${className}`}>
			{children}
		</h1>
	);
}
