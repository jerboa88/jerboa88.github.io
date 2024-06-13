/*
	Ghost button with the site name and icon
	----------------------------------------
*/

import React from 'react';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { ButtonInterface } from '../../common/types';
import GhostButton from '../input/ghost-button';
import { getSiteMetadata } from '../../common/config-manager';

const BUTTON_PROPS = {
	text: new URL(getSiteMetadata().siteUrl).hostname,
	icon: faSignature,
	flip: false,
};

export default function SignatureGhostButton(props: ButtonInterface) {
	return <GhostButton {...{ ...props, ...BUTTON_PROPS }} />;
}
