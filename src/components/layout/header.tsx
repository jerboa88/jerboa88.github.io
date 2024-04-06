/*
	Page header with navbar and title
	---------------------------------
*/


import React from 'react';
import { motion } from 'framer-motion';
import { SiteMetadataInterface, SectionInterface } from '../../common/types';
import { getDefaultTransition } from '../../common/utilities';
import { H1 } from '../../components/text-components';
import TabsWidget from '../../components/tabs-widget';


interface HeaderPropsInterface {
	siteMetadata: SiteMetadataInterface;
	titleLayoutId?: string;
	isTitleExpanded?: boolean;
	sections: SectionInterface[];
}

export default function Header({ siteMetadata, titleLayoutId, isTitleExpanded = false, sections }: HeaderPropsInterface) {
	const monogram = siteMetadata.author.name[0];
	const siteDomain = new URL(siteMetadata.siteUrl).host;

	let bgColorStyles = 'bg-base-200';
	let dividerOpacityStyles = 'opacity-100';
	let justificationStyles = 'justify-between';

	if (isTitleExpanded) {
		bgColorStyles = 'bg-base-300';
		dividerOpacityStyles = 'opacity-0';
		justificationStyles = 'justify-center';
	}

	return (
		<header className={`fixed top-0 w-full z-20 transition-colors ${bgColorStyles}`}>
			<div className={`flex-row p-4 pb-4 items-center ${justificationStyles}`}>
				{!isTitleExpanded && <motion.a href="/" layoutId={titleLayoutId} {...getDefaultTransition()}>
					<H1 className="m-0 px-2 text-xl">
						<span className="inline sm:hidden">{monogram}</span>
						<span className="hidden sm:inline md:hidden">{siteDomain}</span>
						<span className="hidden md:inline">{siteMetadata.author.name}</span>
					</H1>
				</motion.a>}

				<TabsWidget sections={sections} hideIndicator={isTitleExpanded} />
			</div>
			<div className={`divider h-auto m-0 transition-opacity ${dividerOpacityStyles}`} />
		</header>
	);
}
