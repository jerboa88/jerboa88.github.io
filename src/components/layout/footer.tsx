/*
	Page footer with external links
	-------------------------------
*/


import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { SiteMetadataInterface } from '../../common/types';
import GhostButtonLink from '../links/ghost-button-link';
import Tooltip from '../tooltip';


interface FooterPropsInterface {
	siteMetadata: SiteMetadataInterface;
}

export default function Footer({ siteMetadata }: FooterPropsInterface) {
	return (
		<footer className="z-20 w-full bg-base-200">
			<div className="m-0 h-auto opacity-100 divider" />
			<div className="flex flex-row justify-between items-center p-4 pb-4">
				<nav className="flex flex-row justify-center tabs font-button">
					<Tooltip text="View the source code on GitHub" className="!tooltip-right">
						<GhostButtonLink text="Source" to={siteMetadata.sourceUrl} />
					</Tooltip>
					<Tooltip text="View the Privacy Policy" className="!tooltip-right">
						<GhostButtonLink text="Privacy" to="/privacy-policy" isInternal />
					</Tooltip>
				</nav>
				<nav className="flex flex-row justify-center">
					<Tooltip text="View my profile on LinkedIn" className="!tooltip-left">
						<GhostButtonLink to={siteMetadata.author.link.linkedin} icon={faLinkedin} />
					</Tooltip>
					<Tooltip text="View my profile on GitHub" className="!tooltip-left">
						<GhostButtonLink to={siteMetadata.author.link.github} icon={faGithub} />
					</Tooltip>
				</nav>
			</div>
		</footer>
	);
}
