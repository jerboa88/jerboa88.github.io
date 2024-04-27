/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/


import React from 'react';
import { ButtonInterface, LinkInterface } from '../../common/types';
import LinkWrapper from './link-wrapper';
import GhostButton from '../input/ghost-button';


interface GhostButtonLinkPropsInterface extends ButtonInterface, LinkInterface { }

export default function GhostButtonLink({ className, iconClassName, textClassName, icon, text, disabled, responsive, flip, to, isInternal, rel }: GhostButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel} className="contents">
			<GhostButton {...{ className, iconClassName, textClassName, icon, text, disabled, responsive, flip }} />
		</LinkWrapper>
	);
}
