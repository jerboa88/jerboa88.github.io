/*
	Page section
	------------
*/


import React, { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName } from '../../common/types';
import SectionHeader from './section-header';


interface SectionPropsInterface extends PropsWithClassName, PropsWithChildren {
	id?: string;
	title?: string;
	button?: {
		text: string;
		icon: IconDefinition;
		to: string;
	};
}

const Section = forwardRef(({ className = '', id, title, button, children }: SectionPropsInterface, ref: ForwardedRef<HTMLElement>) => (
	<section id={id} ref={ref} className={`flex z-10 flex-col justify-center p-8 w-full max-w-5xl sm:w-10/12 lg:w-9/12 xl:w-8/12 ${className}`}>
		{title && <SectionHeader title={title} button={button} />}
		{children}
	</section>
));

export default Section
