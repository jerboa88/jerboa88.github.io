/*
	Page footer with external links
	-------------------------------
*/

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PRIVACY_POLICY_PATH } from '../../config/constants.ts';
import { getSiteMetadata } from '../../managers/config.ts';
import { TooltipPosition } from '../../types/components.ts';
import { Divider } from '../divider.tsx';
import { GhostButtonLink } from '../links/ghost-button-link.tsx';

// Constants

const SITE_METADATA = getSiteMetadata();

export function Footer() {
	return (
		<footer className="z-30 w-full shadow-lg backdrop-blur-md bg-glass">
			<div className="mix-blend-overlay" data-nosnippet>
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
							to={PRIVACY_POLICY_PATH}
							text="Privacy"
							tooltipText="View the Privacy Policy"
							tooltipPosition={TooltipPosition.Right}
							rel="privacy-policy"
							isInternal
						/>
					</nav>
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
				</div>
			</div>
		</footer>
	);
}
