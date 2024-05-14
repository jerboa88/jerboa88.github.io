/*
	A hero header component that displays the site name and tagline
	---------------------------------------------------------------
*/


import React from 'react';
import { motion } from 'framer-motion';
import ConfigManager from '../../common/config-manager';
import Heading from '../../components/text/heading';


interface HeroHeaderProps {
	titleLayoutId?: string;
	isTitleExpanded?: boolean;
}

export default function HeroHeader({ titleLayoutId = 'title-layout', isTitleExpanded = false }: HeroHeaderProps) {
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
		<motion.a href="/" className="z-20" layoutId={titleLayoutId}>
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
