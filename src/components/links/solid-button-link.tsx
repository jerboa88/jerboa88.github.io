/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/

import type { ButtonInterface, LinkInterface } from '../../common/types';
import SolidButton from '../input/solid-button';
import LinkWrapper from './link-wrapper';

interface Props extends ButtonInterface, LinkInterface {}

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
