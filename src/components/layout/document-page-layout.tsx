/*
	Layout component that provides basic styles for printable pages
	---------------------------------------------------------------
*/

import { MotionConfig } from 'motion/react';
import { type PropsWithChildren, StrictMode } from 'react';
import { SPRING_TRANSITION_PROPS } from '../../config/constants.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { PageCounter } from '../page-counter.tsx';
import { ResumeHeader } from './resume-header.tsx';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {
	numOfPages?: number;
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
					{numOfPages && <PageCounter numOfPages={numOfPages} />}
				</div>
			</MotionConfig>
		</StrictMode>
	);
}
