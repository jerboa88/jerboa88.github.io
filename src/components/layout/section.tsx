/*
	Page section
	------------
*/


import React, { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { ButtonElementRenderFunction, PropsWithClassName } from '../../common/types';
import { getClassNameProps, toKebabCase } from '../../common/utilities';
import SectionHeader from './section-header';


interface Props extends PropsWithClassName, PropsWithChildren {
	title?: string;
	renderButton?: ButtonElementRenderFunction;
	responsive?: boolean;
}

const Section = forwardRef(({ className = '', title, renderButton, responsive = true, children }: Props, ref: ForwardedRef<HTMLElement>) => {
	const classNameProps = getClassNameProps(
		'flex z-10 flex-col justify-center p-8 w-full',
		responsive && 'max-w-5xl sm:w-10/12 lg:w-9/12 xl:w-8/12',	// Adjust width based on screen size
		className,
	);
	const sectionHeaderClassNameProps = getClassNameProps(
		responsive && 'pt-10',	// Add padding to account for floating page header
	);

	const sectionId = title ? toKebabCase(title) : 'top';

	return (
		<section id={sectionId} ref={ref} {...classNameProps}>
			{title && (
				<SectionHeader {...{ title, renderButton, ...sectionHeaderClassNameProps }} />
			)}
			{children}
		</section>
	);
});

export default Section
