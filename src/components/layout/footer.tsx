/*
	Page footer with external links
	-------------------------------
*/

import { FUNDING_PATH, PRIVACY_POLICY_PATH } from '../../config/constants.ts';
import { getSiteMetadata } from '../../managers/config.ts';
import { TooltipPosition } from '../../types/components.ts';
import { Divider } from '../divider.tsx';
import { GhostButtonLink } from '../links/ghost-button-link.tsx';
import { SignatureGhostButton } from '../seo/signature-ghost-button.tsx';

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
							to={FUNDING_PATH}
							text="Funding"
							tooltipText="View funding options"
							tooltipPosition={TooltipPosition.Right}
							isInternal
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
					<SignatureGhostButton />
				</div>
			</div>
		</footer>
	);
}
