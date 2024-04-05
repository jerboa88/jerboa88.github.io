/*
	Widget to show tabs for each section of the page
	------------------------------------------------
*/


import React from 'react';
import { motion, useInView } from 'framer-motion';
import { getDefaultTransition } from '../common/utilities';
import { SectionInterface } from '../common/types';
import ButtonLink from './links/button-link';


interface TabsWidgetPropsInterface {
	sections: SectionInterface[];
}

export default function TabsWidget({ sections }: TabsWidgetPropsInterface) {
	// Map is used here because we need to call the same number of hook every time. Otherwise, React will complain
	const currentSectionIndex = sections.map(section => useInView(section.ref, {
		amount: 0,
		margin: '-16%',
	})).findIndex(inView => inView);

	return (
		<motion.nav layout="position" className="tabs flex flex-row justify-center" {...getDefaultTransition()}>
			{
				sections && sections.map(({ id, title }, i) => {
					let buttonActiveClass = '';
					let indicatorElement = <div className="w-4 h-1 bg-transparent rounded-full" />;

					if (currentSectionIndex === i) {
						buttonActiveClass = 'tab-active';
						indicatorElement = <motion.div className="w-4 h-1 bg-primary rounded-full" layoutId="active-tab-indicator" {...getDefaultTransition()} />;
					}

					return (
						<div key={title} className="flex flex-col items-center">
							<motion.div layout="position" {...getDefaultTransition()}>
								<ButtonLink className={`tab !py-0 ${buttonActiveClass}`} text={title} to={`#${id}`} isInternal />
							</motion.div>
							{indicatorElement}
						</div>
					);
				})
			}
		</motion.nav>
	);
}
