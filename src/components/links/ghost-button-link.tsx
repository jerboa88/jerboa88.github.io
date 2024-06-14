/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/

import type { ButtonInterface, LinkInterface } from '../../common/types';
import GhostButton from '../input/ghost-button';
import LinkWrapper from './link-wrapper';

interface Props extends ButtonInterface, LinkInterface {}

export default function GhostButtonLink({
	to,
	isInternal,
	rel,
	...remainingProps
}: Props) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel} className="contents">
			<GhostButton {...remainingProps} />
		</LinkWrapper>
	);
}
