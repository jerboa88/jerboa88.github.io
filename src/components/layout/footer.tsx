/*
	Page footer with external links
	-------------------------------
*/

import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { TooltipPosition } from '../../common/types';
import GhostButtonLink from '../links/ghost-button-link';
import Divider from '../divider';
import { getSiteMetadata } from '../../common/config-manager';

// Constants

const SITE_METADATA = getSiteMetadata();

export default function Footer() {
	return (
		<footer className="z-30 w-full shadow-lg backdrop-blur-md bg-glass">
			<div className="mix-blend-overlay">
				<Divider />
				<div className="flex flex-row justify-between items-center p-4 pb-4">
					<nav className="flex flex-row justify-center tabs font-button">
						<GhostButtonLink
							to={SITE_METADATA.sourceUrl}
							text="Source"
							tooltipText="View the source code on GitHub"
							tooltipPosition={TooltipPosition.Right}
						/>
						<GhostButtonLink
							to="/privacy-policy"
							text="Privacy"
							tooltipText="View the Privacy Policy"
							tooltipPosition={TooltipPosition.Right}
							isInternal
						/>
					</nav>
					<nav className="flex flex-row justify-center">
						<GhostButtonLink
							to={SITE_METADATA.author.link.linkedin}
							icon={faLinkedin}
							tooltipText="View my profile on LinkedIn"
							tooltipPosition={TooltipPosition.Left}
						/>
						<GhostButtonLink
							to={SITE_METADATA.author.link.github}
							icon={faGithub}
							tooltipText="View my profile on GitHub"
							tooltipPosition={TooltipPosition.Left}
						/>
					</nav>
				</div>
			</div>
		</footer>
	);
}
