/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/

import type { Button, Link } from '../../types/types';
import { GhostButton } from '../input/ghost-button';
import { LinkWrapper } from './link-wrapper';

interface Props extends Button, Link {}

export function GhostButtonLink({
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
