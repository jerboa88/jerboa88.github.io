/*
	Widget to show tabs for each section of a page
	----------------------------------------------
*/


import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionInterface, TooltipPosition } from '../common/types';
import { USE_IN_VIEW_OPTIONS } from '../common/constants';
import { getClassNameProps } from '../common/utilities';
import GhostButtonLink from './links/ghost-button-link';


interface TabsPropsInterface {
	sections: SectionInterface[];
	hideIndicator?: boolean;
}

export default function Tabs({ sections, hideIndicator = false }: TabsPropsInterface) {
	// Map is used here because we need to call the same number of hook every time. Otherwise, React will complain
	const sectionInViewHooks = sections.map(section => useInView(section.ref, USE_IN_VIEW_OPTIONS));
	const currentSectionIndex = hideIndicator ? -1 : sectionInViewHooks.findIndex(inView => inView);

	return (
		<motion.nav layout="position" className="flex flex-row justify-center tabs">
			{
				sections && sections.map(({ id, title }, i) => {
					const ghostButtonLinkClassNameProps = getClassNameProps(
						'tab !py-0',
						currentSectionIndex === i && 'tab-active',
					);
					const indicatorElement = (currentSectionIndex === i) ? (
						<motion.div className="w-4 h-1 rounded-full bg-primary" layoutId="active-tab-indicator" />
					) : (
						<div className="w-4 h-1 bg-transparent rounded-full" />
					);

					return (
						<div key={title} className="flex flex-col items-center">
							<motion.div layout="position">
								<GhostButtonLink
									text={title}
									to={`#${id}`}
									tooltipText={`Go to ${title} section`}
									tooltipPosition={TooltipPosition.Bottom}
									isInternal
									{...ghostButtonLinkClassNameProps} />
							</motion.div>
							{indicatorElement}
						</div>
					);
				})
			}
		</motion.nav>
	);
}
