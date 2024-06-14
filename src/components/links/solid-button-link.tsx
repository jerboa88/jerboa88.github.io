/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/

import { ButtonInterface, LinkInterface } from '../../common/types';
import LinkWrapper from './link-wrapper';
import SolidButton from '../input/solid-button';

interface Props extends ButtonInterface, LinkInterface { }

export default function SolidButtonLink({
	to,
	isInternal,
	rel,
	...remainingProps
}: Props) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<SolidButton {...remainingProps} />
		</LinkWrapper>
	);
}
