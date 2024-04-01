/*
	Page section
	------------
*/


import React, { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from './section-header';


interface SectionPropsInterface extends PropsWithChildren {
	className?: string;
	id?: string;
	title?: string;
	button?: {
		text?: string;
		icon?: IconDefinition;
		to: string;
	};
}

const Section = forwardRef(({ className = '', id, title, button, children }: SectionPropsInterface, ref: ForwardedRef<HTMLElement>) => (
	<section id={id} ref={ref} className={`flex flex-col w-full sm:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 p-8 text-white justify-center ${className}`}>
		{title && <SectionHeader title={title} button={button} />}
		{children}
	</section>
));

export default Section
