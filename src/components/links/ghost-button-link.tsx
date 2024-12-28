/*
	A borderless button link with optional text/icon
	------------------------------------------------
*/

import type { Button, Link } from '../../types/components.ts';
import { isDefined } from '../../utils/other.ts';
import { GhostButton } from '../input/ghost-button.tsx';
import { LinkWrapper } from './link-wrapper.tsx';

interface Props extends Button, Link {}

export function GhostButtonLink({
	to,
	isInternal,
	rel,
	...remainingProps
}: Props) {
	const isInternalProp = isDefined(isInternal) ? { isInternal } : {};
	const relProp = isDefined(rel) ? { rel } : {};

	return (
		<LinkWrapper to={to} className="contents" {...isInternalProp} {...relProp}>
			<GhostButton {...remainingProps} />
		</LinkWrapper>
	);
}
