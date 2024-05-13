/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { SiteMetadataInterface, TooltipPosition } from '../../common/types';
import GhostButtonLink from '../links/ghost-button-link';
import Divider from '../divider';


interface FooterPropsInterface {
	siteMetadata: SiteMetadataInterface;
}

export default function Footer({ siteMetadata }: FooterPropsInterface) {
	return (
		<footer className="z-30 w-full shadow-lg backdrop-blur-md bg-glass">
			<div className="mix-blend-overlay">
				<Divider />
				<div className="flex flex-row justify-between items-center p-4 pb-4">
					<nav className="flex flex-row justify-center tabs font-button">
						<GhostButtonLink
							to={siteMetadata.sourceUrl}
							text="Source"
							tooltipText="View the source code on GitHub"
							tooltipPosition={TooltipPosition.Right} />
						<GhostButtonLink
							to="/privacy-policy"
							text="Privacy"
							tooltipText="View the Privacy Policy"
							tooltipPosition={TooltipPosition.Right}
							isInternal />
					</nav>
					<nav className="flex flex-row justify-center">
						<GhostButtonLink
							to={siteMetadata.author.link.linkedin}
							icon={faLinkedin}
							tooltipText="View my profile on LinkedIn"
							tooltipPosition={TooltipPosition.Left} />
						<GhostButtonLink
							to={siteMetadata.author.link.github}
							icon={faGithub}
							tooltipText="View my profile on GitHub"
							tooltipPosition={TooltipPosition.Left} />
					</nav>
				</div>
			</div>
		</footer>
	);
}
