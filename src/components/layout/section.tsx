/*
	Page section
	------------
*/

import { type ForwardedRef, type PropsWithChildren, forwardRef } from 'react';
import type { ButtonElementRenderFn } from '../../types/components.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { toKebabCase } from '../../utils/strings.ts';
import { Divider } from '../divider.tsx';
import { SectionHeader } from './section-header.tsx';

interface Props extends PropsWithClassName, PropsWithChildren {
	sectionHeaderClassName?: string;
	sectionHeadingClassName?: string;
	dividerClassName?: string;
	title?: string;
	renderButton?: ButtonElementRenderFn;
	responsive?: boolean;
}

export const Section = forwardRef(
	(
		{
			className,
			sectionHeaderClassName,
			sectionHeadingClassName,
			dividerClassName,
			title,
			renderButton,
			responsive = true,
			children,
		}: Props,
		ref: ForwardedRef<HTMLElement>,
	) => {
		const classNameProps = getClassNameProps(
			'flex z-10 flex-col justify-center break-inside-avoid-page',
			responsive ? 'w-10/12 lg:w-9/12 xl:w-8/12 max-w-5xl' : 'w-full', // Adjust width based on screen size
			className,
		);
		const sectionHeaderClassNameProps = {
			...getClassNameProps(
				responsive && 'pt-10', // Add padding to account for floating page header
				sectionHeaderClassName,
			),
			...(sectionHeadingClassName
				? { headingClassName: sectionHeadingClassName }
				: {}),
		};
		const dividerClassNameProps = getClassNameProps('pb-8', dividerClassName);

		const sectionId = title ? toKebabCase(title) : 'top';

		return (
			<section id={sectionId} ref={ref} {...classNameProps}>
				{title && (
					<>
						<SectionHeader
							{...{ title, renderButton, ...sectionHeaderClassNameProps }}
						/>
						<Divider {...dividerClassNameProps} />
					</>
				)}
				{children}
			</section>
		);
	},
);
