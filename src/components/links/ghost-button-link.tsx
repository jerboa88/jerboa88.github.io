/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/

import { ButtonInterface, LinkInterface } from '../../common/types';
import LinkWrapper from './link-wrapper';
import GhostButton from '../input/ghost-button';

interface Props extends ButtonInterface, LinkInterface { }

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
