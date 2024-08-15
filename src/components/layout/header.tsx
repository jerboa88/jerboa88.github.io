/*
	Page header with navbar and title
	---------------------------------
*/

import { motion } from 'framer-motion';
import { getSiteMetadata } from '../../common/config-manager';
import { TITLE_LAYOUT_ID } from '../../common/constants';
import { getClassNameProps, isDefined } from '../../common/utils/other';
import { getStartIndexOfLastWord } from '../../common/utils/strings';
import { Breakpoint, type PageSection } from '../../types/components';
import { Divider } from '../divider';
import { Tabs } from '../tabs';
import { Heading } from '../text/heading';
import { ResponsiveText } from '../text/responsive-text';

// Types

interface Props {
	expandTitle?: boolean | undefined;
	sections: PageSection[];
}

// Constants

const SITE_METADATA = getSiteMetadata();

export function Header({ expandTitle, sections }: Props) {
	const headerClassNameProps = getClassNameProps(
		'fixed top-0 z-30 w-full transition',
		!expandTitle && 'bg-glass backdrop-blur-md shadow-lg', // Transparent bg when title is expanded
	);
	const containerClassNameProps = getClassNameProps(
		'flex-row items-center p-4',
		expandTitle ? 'justify-center' : 'justify-between', // Center title when expanded
	);
	const dividerClassNameProps = getClassNameProps(
		'transition-opacity',
		expandTitle ? 'opacity-0' : 'opacity-100', // Hide divider when title is expanded
	);
	const layoutIdProp: { layoutId?: string } = {};

	// If expandTitle is not specified, don't animate the title
	if (isDefined(expandTitle)) {
		layoutIdProp.layoutId = TITLE_LAYOUT_ID;
	}

	return (
		<header {...headerClassNameProps}>
			<div className="mix-blend-overlay" data-nosnippet>
				<div {...containerClassNameProps}>
					{!expandTitle && (
						<motion.a href="/" {...layoutIdProp}>
							<Heading className="px-2 m-0 text-xl">
								<ResponsiveText
									text={SITE_METADATA.author.name.full}
									breakpoints={{
										[Breakpoint.Default]: 1,
										[Breakpoint.Sm]: getStartIndexOfLastWord(
											SITE_METADATA.author.name.full,
										),
										[Breakpoint.Md]: undefined,
									}}
								/>
							</Heading>
						</motion.a>
					)}
					<Tabs sections={sections} hideIndicator={expandTitle} />
				</div>
				<Divider {...dividerClassNameProps} />
			</div>
		</header>
	);
}
