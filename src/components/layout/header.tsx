/*
	Page header with navbar and title
	---------------------------------
*/


import React from 'react';
import { motion } from 'framer-motion';
import { SiteMetadataInterface, SectionInterface } from '../../common/types';
import Tabs from '../tabs';
import Heading from '../text/heading';


interface HeaderPropsInterface {
	siteMetadata: SiteMetadataInterface;
	titleLayoutId?: string;
	isTitleExpanded?: boolean;
	sections: SectionInterface[];
}

export default function Header({ siteMetadata, titleLayoutId = 'title-layout', isTitleExpanded = false, sections }: HeaderPropsInterface) {
	let bgStyles = 'bg-glass backdrop-blur';
	let dividerOpacityStyles = 'opacity-100';
	let justificationStyles = 'justify-between';

	if (isTitleExpanded) {
		bgStyles = '';
		dividerOpacityStyles = 'opacity-0';
		justificationStyles = 'justify-center';
	}

	return (
		<header className={`fixed top-0 z-30 w-full transition ${bgStyles}`}>
			<div className="mix-blend-overlay">
				<div className={`flex-row items-center p-4 ${justificationStyles}`}>
					{!isTitleExpanded && (
						<motion.a href="/" layoutId={titleLayoutId}>
							<Heading className="px-2 m-0 text-xl">
								<span className="inline sm:hidden">{siteMetadata.author.name.initial}</span>
								<span className="hidden sm:inline md:hidden">{siteMetadata.author.name.short}</span>
								<span className="hidden md:inline">{siteMetadata.author.name.full}</span>
							</Heading>
						</motion.a>
					)}
					<Tabs sections={sections} hideIndicator={isTitleExpanded} />
				</div>
				<div className={`m-0 h-auto transition-opacity divider ${dividerOpacityStyles}`} />
			</div>
		</header>
	);
}
