/*
	A hero header component that displays the site name and tagline
	---------------------------------------------------------------
*/


import React from 'react';
import { motion } from 'framer-motion';
import { TITLE_LAYOUT_ID } from '../../common/constants';
import ConfigManager from '../../common/config-manager';
import Heading from '../../components/text/heading';


interface HeroHeaderProps {
	isTitleExpanded?: boolean;
}

export default function HeroHeader({ isTitleExpanded = false }: HeroHeaderProps) {
	const siteMetadata = new ConfigManager().getMetadata();

	const titleElement = (
		<Heading className="m-4 text-6xl">
			<span className="inline md:hidden">
				{siteMetadata.author.name.short}
			</span>
			<span className="hidden md:inline">
				{siteMetadata.author.name.full}
			</span>
		</Heading>
	);

	const titleWrapperElement = isTitleExpanded ? (
		<motion.a href="/" className="z-20" layoutId={TITLE_LAYOUT_ID}>
			{titleElement}
		</motion.a>
	) : (
		<a href="/" className="z-20 opacity-0">
			{titleElement}
		</a>
	);

	return (
		<>
			{titleWrapperElement}
			<span className="m-4">
				{siteMetadata.tagline}
			</span>
		</>
	);
}
