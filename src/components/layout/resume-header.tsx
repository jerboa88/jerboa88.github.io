/*
	Header for resume page
	----------------------
*/

import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
	faEnvelopeSquare,
	faLocationArrow,
	faPhoneSquare,
} from '@fortawesome/free-solid-svg-icons';
import { getSiteMetadata } from '../../common/config-manager';
import { CONTACT_PATH } from '../../common/constants';
import { getAbsoluteUrl, removeProtocol } from '../../common/utils';
import { type CityAndStateString, TooltipPosition } from '../../types/types';
import { GhostButton } from '../input/ghost-button';
import { GhostButtonLink } from '../links/ghost-button-link';
import { Heading } from '../text/heading';

// Constants

const SITE_METADATA = getSiteMetadata();
const CONTACT_URL = removeProtocol(getAbsoluteUrl(CONTACT_PATH));
const COMMON_GHOST_BUTTON_LINK_PROPS = {
	tooltipPosition: TooltipPosition.Left,
	className: '!p-0',
	iconClassName: 'text-xl text-primary',
};

export function ResumeHeader() {
	const phone = SITE_METADATA.author.phone;
	const email = SITE_METADATA.author.email;
	const location: CityAndStateString = `${SITE_METADATA.author.location.city}, ${SITE_METADATA.author.location.state}`;

	return (
		<header className="flex flex-col gap-8 sm:flex-row justify-between items-center w-full">
			<Heading className="text-5xl text-primary text-right">
				<span className="inline sm:hidden">
					{SITE_METADATA.author.name.short}
				</span>
				<span className="hidden sm:inline">
					{SITE_METADATA.author.name.full}
				</span>
			</Heading>
			<ul>
				{phone && (
					<li>
						<GhostButtonLink
							to={phone ? `tel:${phone}` : CONTACT_PATH}
							text={phone}
							icon={faPhoneSquare}
							tooltipText="Give me a call"
							{...COMMON_GHOST_BUTTON_LINK_PROPS}
						/>
					</li>
				)}
				<li>
					<GhostButtonLink
						to={email ? `mailto:${email}` : CONTACT_PATH}
						text={email ?? CONTACT_URL}
						icon={faEnvelopeSquare}
						tooltipText="Send me an email"
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
					/>
				</li>
				<li>
					<GhostButtonLink
						to={SITE_METADATA.author.url.github}
						text={removeProtocol(SITE_METADATA.author.url.github)}
						icon={faGithubSquare}
						tooltipText="View my profile on GitHub"
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
					/>
				</li>
				<li>
					<GhostButtonLink
						to={SITE_METADATA.author.url.linkedin}
						text={removeProtocol(SITE_METADATA.author.url.linkedin)}
						icon={faLinkedin}
						tooltipText="View my profile on LinkedIn"
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
					/>
				</li>
				<li>
					<GhostButton
						text={location}
						icon={faLocationArrow}
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
						disabled
					/>
				</li>
			</ul>
		</header>
	);
}
