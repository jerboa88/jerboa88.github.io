/*
	Page section
	------------
*/


import React, { ForwardedRef, forwardRef } from 'react';
import { H2 } from '../../components/text-components';


interface SectionPropsInterface {
	className?: string;
	id?: string;
	title?: string;
	children: React.ReactNode;
}

const Section = forwardRef(({ className = '', id, title, children }: SectionPropsInterface, ref: ForwardedRef<HTMLElement>) => (
	<section id={id} ref={ref} className={`flex flex-col w-full sm:w-5/6 xl:w-4/6 p-8 text-white text-center justify-center ${className}`}>
		{title && <H2>{title}</H2>}
		{children}
	</section>
));

export default Section
