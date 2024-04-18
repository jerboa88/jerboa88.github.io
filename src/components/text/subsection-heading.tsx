/*
	Level 3 heading text. Used for subsection/card titles
	-----------------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';


interface TextComponentPropsInterface extends PropsWithClassName, PropsWithChildren { }

export default function SubsectionHeading({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h3 className={`my-4 text-lg font-heading font-semibold drop-shadow ${className}`}>
			{children}
		</h3>
	);
}
