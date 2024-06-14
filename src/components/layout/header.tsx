/*
	Page header with navbar and title
	---------------------------------
*/

import { motion } from 'framer-motion';
import { SectionInterface } from '../../common/types';
import { TITLE_LAYOUT_ID } from '../../common/constants';
import { getClassNameProps } from '../../common/utilities';
import Tabs from '../tabs';
import Heading from '../text/heading';
import Divider from '../divider';
import { getSiteMetadata } from '../../common/config-manager';

// Types

interface Props {
	expandTitle?: boolean;
	sections: SectionInterface[];
}

// Constants

const SITE_METADATA = getSiteMetadata();

export default function Header({ expandTitle = false, sections }: Props) {
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

	return (
		<header {...headerClassNameProps}>
			<div className="mix-blend-overlay">
				<div {...containerClassNameProps}>
					{!expandTitle && (
						<motion.a href="/" layoutId={TITLE_LAYOUT_ID}>
							<Heading className="px-2 m-0 text-xl">
								<span className="inline sm:hidden">
									{SITE_METADATA.author.name.initial}
								</span>
								<span className="hidden sm:inline md:hidden">
									{SITE_METADATA.author.name.short}
								</span>
								<span className="hidden md:inline">
									{SITE_METADATA.author.name.full}
								</span>
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
