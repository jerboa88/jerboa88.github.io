/*
	Individual tab component
	------------------------
*/

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { TooltipPosition } from '../types/components.ts';
import { getClassNameProps } from '../utils/other.ts';
import { toKebabCase } from '../utils/strings.ts';
import { GhostButtonLink } from './links/ghost-button-link.tsx';

interface Props {
	title: string;
	isActive: boolean;
}

export function Tab({ title, isActive }: Props) {
	const ghostButtonLinkClassNameProps = useMemo(
		() => getClassNameProps('tab !py-0', isActive && 'tab-active'),
		[isActive],
	);
	const indicatorElement = useMemo(
		() =>
			isActive ? (
				<motion.div
					key={title}
					className="w-4 h-1 rounded-full bg-primary shadow-emboss"
					layoutId="active-tab-indicator"
				/>
			) : (
				<div key={title} className="w-4 h-1 bg-transparent rounded-full" />
			),
		[isActive, title],
	);

	return (
		<div key={title} className="flex flex-col items-center">
			<GhostButtonLink
				text={title}
				to={`#${toKebabCase(title)}`}
				tooltipText={`Go to ${title} section`}
				tooltipPosition={TooltipPosition.Bottom}
				isInternal
				{...ghostButtonLinkClassNameProps}
			/>
			{indicatorElement}
		</div>
	);
}
