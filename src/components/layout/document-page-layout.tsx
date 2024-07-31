/*
	Layout component that provides basic styles for printable pages
	---------------------------------------------------------------
*/

import { MotionConfig } from 'framer-motion';
import { type PropsWithChildren, StrictMode } from 'react';
import { SPRING_TRANSITION_PROPS } from '../../common/constants';
import type { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utils';
import { PageCounter } from '../page-counter';
import { ResumeHeader } from './resume-header';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {
	numOfPages: number;
}

export function DocumentPageLayout({ className, numOfPages, children }: Props) {
	const classNameProps = getClassNameProps(
		'flex-col gap-4 p-[5%] print:p-0 justify-between items-center mx-auto text-base min-h-svh scroll-smooth selection:bg-primary selection:text-primary-content',
		className,
	);

	return (
		<StrictMode>
			<MotionConfig {...SPRING_TRANSITION_PROPS} reducedMotion="user">
				{/* Page body */}
				<div {...classNameProps}>
					<ResumeHeader />
					{children}
					<PageCounter numOfPages={numOfPages} />
				</div>
			</MotionConfig>
		</StrictMode>
	);
}
