/*
	Page header with navbar and title
	---------------------------------
*/


import React from 'react';
import { motion } from 'framer-motion';
import { SiteMetadataInterface, SectionInterface } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import Tabs from '../tabs';
import Heading from '../text/heading';


interface HeaderPropsInterface {
	siteMetadata: SiteMetadataInterface;
	titleLayoutId?: string;
	isTitleExpanded?: boolean;
	sections: SectionInterface[];
}


export default function Header({ siteMetadata, titleLayoutId = 'title-layout', isTitleExpanded = false, sections }: HeaderPropsInterface) {
	const headerClassNameProps = getClassNameProps(
		'fixed top-0 z-30 w-full transition',
		!isTitleExpanded && 'bg-glass backdrop-blur-md shadow-lg',	// Transparent bg when title is expanded
	);
	const containerClassNameProps = getClassNameProps(
		'flex-row items-center p-4',
		isTitleExpanded ? 'justify-center' : 'justify-between',	// Center title when expanded
	);
	const dividerClassNameProps = getClassNameProps(
		'm-0 h-auto transition-opacity divider',
		isTitleExpanded ? 'opacity-0' : 'opacity-100',	// Hide divider when title is expanded
	);

	return (
		<header {...headerClassNameProps}>
			<div className="mix-blend-overlay">
				<div {...containerClassNameProps}>
					{!isTitleExpanded && (
						<motion.a href="/" layoutId={titleLayoutId}>
							<Heading className="px-2 m-0 text-xl">
								<span className="inline sm:hidden">
									{siteMetadata.author.name.initial}
								</span>
								<span className="hidden sm:inline md:hidden">
									{siteMetadata.author.name.short}
								</span>
								<span className="hidden md:inline">
									{siteMetadata.author.name.full}
								</span>
							</Heading>
						</motion.a>
					)}
					<Tabs sections={sections} hideIndicator={isTitleExpanded} />
				</div>
				<div {...dividerClassNameProps} />
			</div>
		</header>
	);
}
