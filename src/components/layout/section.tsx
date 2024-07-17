/*
	Page section
	------------
*/

import { type ForwardedRef, type PropsWithChildren, forwardRef } from 'react';
import type {
	ButtonElementRenderFunction,
	PropsWithClassName,
} from '../../common/types';
import { getClassNameProps, toKebabCase } from '../../common/utils';
import { Divider } from '../divider';
import { SectionHeader } from './section-header';

interface Props extends PropsWithClassName, PropsWithChildren {
	sectionHeaderClassName?: string;
	dividerClassName?: string;
	title?: string;
	renderButton?: ButtonElementRenderFunction;
	responsive?: boolean;
}

export const Section = forwardRef(
	(
		{
			className,
			sectionHeaderClassName,
			dividerClassName,
			title,
			renderButton,
			responsive = true,
			children,
		}: Props,
		ref: ForwardedRef<HTMLElement>,
	) => {
		const classNameProps = getClassNameProps(
			'flex z-10 flex-col justify-center w-full',
			responsive && 'w-10/12 max-w-5xl lg:w-9/12 xl:w-8/12', // Adjust width based on screen size
			className,
		);
		const sectionHeaderClassNameProps = getClassNameProps(
			responsive && 'pt-10', // Add padding to account for floating page header
			sectionHeaderClassName,
		);
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
