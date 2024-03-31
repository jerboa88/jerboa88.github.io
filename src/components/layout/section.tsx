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
		text: string;
		icon: IconDefinition;
		to: string;
	};
}

const Section = forwardRef(({ className = '', id, title, button, children }: SectionPropsInterface, ref: ForwardedRef<HTMLElement>) => (
	<section id={id} ref={ref} className={`flex flex-col w-full sm:w-5/6 xl:w-4/6 p-8 text-white justify-center ${className}`}>
		{title && <SectionHeader title={title} button={button} />}
		{children}
	</section>
));

export default Section
