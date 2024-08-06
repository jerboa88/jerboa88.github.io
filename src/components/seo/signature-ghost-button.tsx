/*
	Ghost button with the site name and icon
	----------------------------------------
*/

import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { getSiteMetadata } from '../../common/config-manager';
import type { Button } from '../../types/components';
import { GhostButton } from '../input/ghost-button';

const BUTTON_PROPS = {
	text: new URL(getSiteMetadata().siteUrl).hostname,
	icon: faSignature,
	flip: false,
};

export function SignatureGhostButton(props: Button) {
	return <GhostButton {...{ ...props, ...BUTTON_PROPS }} />;
}
