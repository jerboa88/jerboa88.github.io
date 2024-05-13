/*
	Page section
	------------
*/


import React, { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import SectionHeader from './section-header';


interface SectionPropsInterface extends PropsWithClassName, PropsWithChildren {
	id?: string;
	title?: string;
	button?: {
		text: string;
		icon: IconDefinition;
		to: string;
	};
	responsive?: boolean;
}

const Section = forwardRef(({ className = '', id, title, button, responsive = true, children }: SectionPropsInterface, ref: ForwardedRef<HTMLElement>) => {
	const classNameProps = getClassNameProps(
		'flex z-10 flex-col justify-center p-8 w-full',
		responsive && 'max-w-5xl sm:w-10/12 lg:w-9/12 xl:w-8/12',	// Adjust width based on screen size
		className,
	);
	const sectionHeaderClassNameProps = getClassNameProps(
		responsive && 'pt-10',	// Add padding to account for floating page header
	);

	return (
		<section {...{ id, ref, ...classNameProps }}>
			{title && (
				<SectionHeader title={title} button={button} {...sectionHeaderClassNameProps} />
			)}
			{children}
		</section>
	);
});

export default Section
