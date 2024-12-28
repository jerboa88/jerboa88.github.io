/*
	Widget to show tabs for each section of a page
	----------------------------------------------
*/

import { motion, useInView } from 'motion/react';
import { USE_IN_VIEW_OPTIONS } from '../config/constants.ts';
import type { PageSection } from '../types/components.ts';
import { Tab } from './tab.tsx';

interface Props {
	sections: PageSection[];
	hideIndicator?: boolean;
}

export function Tabs({ sections, hideIndicator = false }: Props) {
	// Map is used here because we need to call the same number of hooks every time. Otherwise, React will complain
	const sectionInViewHooks = sections.map((section) =>
		// biome-ignore lint/correctness/useHookAtTopLevel: We need a loop to create the right number of hooks. Array order should be consistent
		useInView(section.ref, USE_IN_VIEW_OPTIONS),
	);
	const currentSectionIndex = hideIndicator
		? -1
		: sectionInViewHooks.findIndex((inView) => inView);

	return (
		<motion.nav layout="position" className="flex flex-row justify-center tabs">
			{sections.map(({ title }, i) => (
				<Tab key={title} title={title} isActive={currentSectionIndex === i} />
			))}
		</motion.nav>
	);
}
