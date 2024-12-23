/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/

import type { Button, Link } from '../../types/components.ts';
import { SolidButton } from '../input/solid-button.tsx';
import { LinkWrapper } from './link-wrapper.tsx';

interface Props extends Button, Link {}

export function SolidButtonLink({
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
