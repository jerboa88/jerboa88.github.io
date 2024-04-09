/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/


import React from 'react';
import { ButtonInterface, LinkInterface } from '../../common/types';
import LinkWrapper from './link-wrapper';
import SolidButton from '../input/solid-button';


interface SolidButtonLinkPropsInterface extends ButtonInterface, LinkInterface { }

export default function SolidButtonLink({ className, iconClassName, textClassName, icon, text, disabled, responsive, flip, to, isInternal, rel }: SolidButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<SolidButton {...{ className, iconClassName, textClassName, icon, text, disabled, responsive, flip }} />
		</LinkWrapper>
	);
}
