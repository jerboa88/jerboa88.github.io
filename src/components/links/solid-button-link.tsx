/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/


import React from 'react';
import { ButtonInterface, LinkInterface } from '../../common/types';
import LinkWrapper from './link-wrapper';
import SolidButton from '../input/solid-button';


interface SolidButtonLinkPropsInterface extends ButtonInterface, LinkInterface { }

export default function SolidButtonLink({ to, isInternal, rel, ...remainingProps }: SolidButtonLinkPropsInterface) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<SolidButton {...remainingProps} />
		</LinkWrapper>
	);
}
