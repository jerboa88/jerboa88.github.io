/*
	A base layout component that provides essential styles and configuration for pages
	----------------------------------------------------------------------------------
*/

import { MotionConfig } from 'motion/react';
import { lazy, type PropsWithChildren, StrictMode } from 'react';
import { SPRING_TRANSITION_PROPS } from '../../config/constants.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {

}

// Constants

const BG_GRADIENT_PROPS = {
	style: {
		background:
			'radial-gradient(100% 100% at 0% 0%,oklch(var(--a)),oklch(var(--b2)),transparent),radial-gradient(100% 100% at 100% 100%,oklch(var(--a)),oklch(var(--b2)),transparent)',
	},
};

const ParticlesBackground = lazy(() =>
	import('./particles-background.tsx').then((module) => ({
		default: module.ParticlesBackground,
	})),
);

export function BaseLayout({
	className,
	children,
}: Props) {
	const classNameProps = getClassNameProps(
		'flex-col gap-32 justify-between items-center mx-auto text-base min-h-svh scroll-smooth selection:bg-primary selection:text-primary-content',
		className,
	);

	return (
		<StrictMode>
			<MotionConfig {...SPRING_TRANSITION_PROPS} reducedMotion="user">
				{/* Page body */}
				<div {...BG_GRADIENT_PROPS} {...classNameProps}>
					<ParticlesBackground />
					{children}
				</div>
			</MotionConfig>
		</StrictMode>
	);
}
