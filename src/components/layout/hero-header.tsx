/*
	A hero header component that displays the site name and tagline
	---------------------------------------------------------------
*/

import { motion } from 'framer-motion';
import { getSiteMetadata } from '../../common/config-manager';
import { TITLE_LAYOUT_ID } from '../../common/constants';
import Heading from '../../components/text/heading';

// Types

interface Props {
	expandTitle?: boolean;
}

// Constants
const SITE_METADATA = getSiteMetadata();

export default function HeroHeader({ expandTitle = false }: Props) {
	const titleElement = (
		<Heading className="m-4 text-6xl">
			<span className="inline md:hidden">
				{SITE_METADATA.author.name.short}
			</span>
			<span className="hidden md:inline">{SITE_METADATA.author.name.full}</span>
		</Heading>
	);

	const titleWrapperElement = expandTitle ? (
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
			<span className="m-4">{SITE_METADATA.tagline}</span>
		</>
	);
}
