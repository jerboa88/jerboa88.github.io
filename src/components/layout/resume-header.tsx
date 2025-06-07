/*
	Header for resume page
	----------------------
*/

import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
	faEnvelopeSquare,
	faLocationArrow,
	faPhoneSquare,
	faSquareBinary,
} from '@fortawesome/free-solid-svg-icons';
import { CONTACT_PATH } from '../../config/constants.ts';
import { getSiteMetadata } from '../../managers/config.ts';
import { Breakpoint, TooltipPosition } from '../../types/components.ts';
import type { CityAndStateString } from '../../types/strings.ts';
import { getStartIndexOfLastWord } from '../../utils/strings.ts';
import { getAbsoluteUrl, removeProtocol } from '../../utils/urls.ts';
import { GhostButton } from '../input/ghost-button.tsx';
import { GhostButtonLink } from '../links/ghost-button-link.tsx';
import { Heading } from '../text/heading.tsx';
import { ResponsiveText } from '../text/responsive-text.tsx';
import { Divider } from '../divider.tsx';

// Constants

const SITE_METADATA = getSiteMetadata();
const CONTACT_URL = removeProtocol(getAbsoluteUrl(CONTACT_PATH));
const COMMON_GHOST_BUTTON_LINK_PROPS = {
	tooltipPosition: TooltipPosition.Left,
	className: '!p-0',
	iconClassName: 'text-xl text-primary',
};

export function ResumeHeader() {
	const role = SITE_METADATA.tagline.split(' & ')[0];
	const phone = SITE_METADATA.author.phone;
	const email = SITE_METADATA.author.email;
	const location: CityAndStateString = `${SITE_METADATA.author.location.city}, ${SITE_METADATA.author.location.state}`;

	return (
		<header className="flex flex-col gap-8 sm:flex-row justify-between items-center w-full">
			<div className="flex flex-col gap-2">
				<Heading className="text-5xl text-primary">
					<ResponsiveText
						text={SITE_METADATA.author.name.full}
						breakpoints={{
							[Breakpoint.Default]: getStartIndexOfLastWord(
								SITE_METADATA.author.name.full,
							),
							[Breakpoint.Sm]: undefined,
						}}
					/>
				</Heading>
				<Divider />
				<div className="flex flex-col gap-2 justify-between sm:flex-row">
					<GhostButton
						text={role}
						icon={faSquareBinary}
						tooltipText={`I'm a ${role}`}
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
						disabled
					/>
					<GhostButton
						text={location}
						icon={faLocationArrow}
						{...COMMON_GHOST_BUTTON_LINK_PROPS}
						disabled
					/>
				</div>
			</div>
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
			</ul>
		</header>
	);
}
