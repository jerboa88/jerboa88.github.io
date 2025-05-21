/*
	A hero header component that displays the site name and tagline
	---------------------------------------------------------------
*/

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'motion/react';
import { Heading } from '../../components/text/heading.tsx';
import { TITLE_LAYOUT_ID } from '../../config/constants.ts';
import { getSiteMetadata } from '../../managers/config.ts';
import { Breakpoint, TooltipPosition } from '../../types/components.ts';
import { getStartIndexOfLastWord } from '../../utils/strings.ts';
import { GhostButtonLink } from '../links/ghost-button-link.tsx';
import { ResponsiveText } from '../text/responsive-text.tsx';

// Types

interface Props {
	expandTitle?: boolean;
}

// Constants

const SITE_METADATA = getSiteMetadata();

export function HeroHeader({ expandTitle = false }: Props) {
	const titleElement = (
		<Heading className="m-4 text-6xl">
			<span className="drop-shadow-emboss">
				<ResponsiveText
					text={SITE_METADATA.author.name.full}
					breakpoints={{
						[Breakpoint.Default]: getStartIndexOfLastWord(
							SITE_METADATA.author.name.full,
						),
						[Breakpoint.Md]: undefined,
					}}
				/>
			</span>
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
			<nav className="flex flex-row justify-center">
				<GhostButtonLink
					to={SITE_METADATA.author.url.linkedin}
					icon={faLinkedin}
					tooltipText="View my profile on LinkedIn"
					tooltipPosition={TooltipPosition.Left}
				/>
				<GhostButtonLink
					to={SITE_METADATA.author.url.github}
					icon={faGithub}
					tooltipText="View my profile on GitHub"
					tooltipPosition={TooltipPosition.Left}
				/>
			</nav>
		</>
	);
}
