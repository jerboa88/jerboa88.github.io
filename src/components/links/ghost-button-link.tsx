/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/

import type { Button, Link } from '../../types/components.ts';
import { GhostButton } from '../input/ghost-button.tsx';
import { LinkWrapper } from './link-wrapper.tsx';

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
