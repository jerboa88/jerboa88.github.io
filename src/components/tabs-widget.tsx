/*
	Widget to show tags with colored bullets
	----------------------------------------
*/


import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { doesWindowExist, getDefaultTransition } from '../common/utilities';


// Exports

interface TabsWidgetPropsInterface {
	sections: {
		name: string;
		url: string;
		ref: React.RefObject<HTMLElement>;
	}[];
}

export default function TabsWidget({ sections }: TabsWidgetPropsInterface) {
	const scrollThreshold = 250;
	const windowOffset = doesWindowExist() ? window.innerHeight / 2 : 0;
	const sectionElems = sections.map(section => section.ref.current);
	const { scrollY } = useViewportScroll();
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

	useEffect(() => {
		let lastYPos = -9999;

		// Use the current scroll position and section dimensions to determine which section is currently active
		function getCurrentSectionIndex(yPos: number) {
			return sectionElems.findIndex(sectionElem => {
				// Loose equality intentional
				if (sectionElem == undefined) {
					return false;
				}

				const offsetYPos = yPos + windowOffset;
				const sectionTopY = sectionElem.offsetTop;
				const sectionBottomY = sectionTopY + sectionElem.offsetHeight;

				return sectionTopY <= offsetYPos && sectionBottomY > offsetYPos;
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

		const unsubscribe = scrollY.onChange(updateCurrentTab);

		return () => {
			unsubscribe();
		}
	}, [currentSectionIndex]);

	return (
		<motion.nav layout="position" className="tabs flex-row justify-center font-button uppercase" {...getDefaultTransition()}>
			{
				sections.map(({ name, url }, i) => {
					const activeClass = currentSectionIndex === i ? 'tab-active' : '';

					return (
						<a href={url} key={name} className={`tab px-2 sm:px-4 ${activeClass}`}>{name}</a>
					);
				})
			}
		</motion.nav>
	);
}
