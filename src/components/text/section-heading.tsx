/*
	Level 2 heading text. Used for section titles
	---------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';


interface TextComponentPropsInterface extends PropsWithClassName, PropsWithChildren { }

export default function SectionHeading({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h2 className={`py-4 text-3xl align-middle font-heading font-medium drop-shadow ${className}`}>
			{children}
		</h2>
	);
}
