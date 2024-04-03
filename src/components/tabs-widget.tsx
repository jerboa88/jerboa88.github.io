/*
	Widget to show tabs for each section of the page
	------------------------------------------------
*/


import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { doesWindowExist, getDefaultTransition } from '../common/utilities';
import { SectionInterface } from '../common/types';
import ButtonLink from './links/button-link';


interface TabsWidgetPropsInterface {
	sections: SectionInterface[];
}

export default function TabsWidget({ sections }: TabsWidgetPropsInterface) {
	const scrollThreshold = 250;
	const windowOffset = doesWindowExist() ? window.innerHeight / 2 : 0;
	const sectionElems = sections ? sections.map(section => section.ref.current) : [];
	const { scrollY } = useScroll();
	const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

	useEffect(() => {
		let lastYPos = -9999;

		// Use the current scroll position and section dimensions to determine which section is currently active
		function getCurrentSectionIndex(yPos: number) {
			// Find the last section that is above the current scroll position
			return sectionElems.findLastIndex(sectionElem => {
				// Loose equality intentional
				if (sectionElem == undefined) {
					console.warn('Section element is undefined');

					return false;
				}

				const offsetYPos = yPos + windowOffset;
				const sectionTopY = sectionElem.offsetTop;

				return sectionTopY <= offsetYPos;
			});
		}

		// Update the active tab when the user scrolls
		async function updateCurrentTab(yPos: number) {
			// Skip update if the scroll position hasn't changed much
			if (Math.abs(yPos - lastYPos) < scrollThreshold) {
				return;
			}

			const newSectionIndex = getCurrentSectionIndex(yPos);

			if (newSectionIndex !== currentSectionIndex) {
				setCurrentSectionIndex(newSectionIndex);
			}

			lastYPos = yPos;
		}

		const unsubscribe = scrollY.on('change', updateCurrentTab);

		return () => {
			unsubscribe();
		}
	}, [sectionElems, scrollY]);

	return (
		<motion.nav layout="position" className="tabs flex flex-row justify-center" {...getDefaultTransition()}>
			{
				sections && sections.map(({ id, title }, i) => {
					const activeClass = currentSectionIndex === i ? 'tab-active' : '';

					return (
						<div key={title} className="flex flex-col items-center">
							<motion.div layout="position" {...getDefaultTransition()}>
								<ButtonLink className={`tab !py-0 ${activeClass}`} text={title} to={`#${id}`} isInternal />
							</motion.div>
							{currentSectionIndex === i ? (
								<motion.div className="w-4 h-1 bg-primary rounded-full" layoutId="active-tab-indicator" {...getDefaultTransition()} />
							) : null}
						</div>
					);
				})
			}
		</motion.nav>
	);
}
