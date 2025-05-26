/*
	A bordered button link with optional text/icon
	----------------------------------------------
*/

import type { Button, Link } from '../../types/components.ts';
import { isDefined } from '../../utils/other.ts';
import { SolidButton } from '../input/solid-button.tsx';
import { LinkWrapper } from './link-wrapper.tsx';

type Props = Link & Omit<Button, 'isNotInteractive'>;

export function SolidButtonLink({
	to,
	isInternal,
	rel,
	text,
	tooltipText,
	...remainingProps
}: Props) {
	const ariaLabel = text ?? tooltipText;
	const isInternalProp = isDefined(isInternal) ? { isInternal } : {};
	const relProp = isDefined(rel) ? { rel } : {};
	const textProp = isDefined(text) ? { text } : {};
	const tooltipTextProp = isDefined(tooltipText) ? { tooltipText } : {};
	const ariaLabelProp = isDefined(ariaLabel) ? { ariaLabel } : {};
	const ariaDescriptionProp = isDefined(tooltipText)
		? { ariaDescription: tooltipText }
		: {};

	return (
		<LinkWrapper
			to={to}
			{...{
				...ariaLabelProp,
				...ariaDescriptionProp,
				...isInternalProp,
				...relProp,
			}}
		>
			<SolidButton
				{...{ ...textProp, ...tooltipTextProp, ...remainingProps }}
				isNotInteractive
			/>
		</LinkWrapper>
	);
}
