/*
	Widget to show tabs for each section of a page
	----------------------------------------------
*/

import { motion, useInView } from 'framer-motion';
import { USE_IN_VIEW_OPTIONS } from '../common/constants';
import { getClassNameProps } from '../common/utils/other';
import { toKebabCase } from '../common/utils/strings';
import { type PageSection, TooltipPosition } from '../types/components';
import { GhostButtonLink } from './links/ghost-button-link';

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
			{sections?.map(({ title }, i) => {
				const ghostButtonLinkClassNameProps = getClassNameProps(
					'tab !py-0',
					currentSectionIndex === i && 'tab-active',
				);
				const indicatorElement =
					currentSectionIndex === i ? (
						<motion.div
							key={title}
							className="w-4 h-1 rounded-full bg-primary shadow-emboss"
							layoutId="active-tab-indicator"
						/>
					) : (
						<div key={title} className="w-4 h-1 bg-transparent rounded-full" />
					);

				return (
					<div key={title} className="flex flex-col items-center">
						<motion.div layout="position">
							<GhostButtonLink
								text={title}
								to={`#${toKebabCase(title)}`}
								tooltipText={`Go to ${title} section`}
								tooltipPosition={TooltipPosition.Bottom}
								isInternal
								{...ghostButtonLinkClassNameProps}
							/>
						</motion.div>
						{indicatorElement}
					</div>
				);
			})}
		</motion.nav>
	);
}
