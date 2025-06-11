/*
	Widget to show tabs for each section of a page
	----------------------------------------------
*/

import { motion, useInView } from 'motion/react';
import { USE_IN_VIEW_OPTIONS } from '../config/constants.ts';
import type { PageSection } from '../types/components.ts';
import { Tab } from './tab.tsx';
import { useEffect } from 'react';
import { toKebabCase } from '../utils/strings.ts';

interface Props {
	sections: readonly PageSection[];
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

	// When the current section changes, update the page URL hash
	useEffect(() => {
		let sectionHash = '';

		if (currentSectionIndex > -1) {
			const sectionTitle = sections[currentSectionIndex].title;

			sectionHash = `#${toKebabCase(sectionTitle)}`;
		}

		const currentUrl = window.location.href.split('#')[0];
		const newUrl = `${currentUrl}${sectionHash}`;

		window.history.replaceState(null, '', newUrl);
	}, [currentSectionIndex, sections]);

	return (
		<motion.nav layout="position" className="flex flex-row justify-center tabs">
			{sections.map(({ title }, i) => (
				<Tab key={title} title={title} isActive={currentSectionIndex === i} />
			))}
		</motion.nav>
	);
}
