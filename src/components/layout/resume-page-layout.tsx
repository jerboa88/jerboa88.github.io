/*
	Layout component that provides basic styles for the resume page
	---------------------------------------------------------------
*/

import { MotionConfig } from 'framer-motion';
import { type PropsWithChildren, StrictMode } from 'react';
import { SPRING_TRANSITION_PROPS } from '../../common/constants';
import { type PropsWithClassName, ThemeType } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import { ResumeHeader } from './resume-header';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {}

export function ResumePageLayout({ className, children }: Props) {
	const classNameProps = getClassNameProps(
		'flex-col gap-32 p-[1cm] justify-between items-center mx-auto text-base min-h-svh scroll-smooth selection:bg-primary selection:text-primary-content',
		className,
	);

	return (
		<StrictMode>
			<MotionConfig {...SPRING_TRANSITION_PROPS} reducedMotion="user">
				{/* Page body */}
				<div data-theme={ThemeType.Light} {...classNameProps}>
					<ResumeHeader />
					{children}
				</div>
			</MotionConfig>
		</StrictMode>
	);
}
