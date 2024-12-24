/*
	An inline link component
	------------------------
*/

import type { Link } from '../../types/components.ts';
import type { PropsWithClassName } from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { LinkWrapper } from './link-wrapper.tsx';

interface Props extends PropsWithClassName, Link {
	text: string;
}

export function InlineLink({ className, text, to, isInternal, rel }: Props) {
	const classNameProps = getClassNameProps(
		'pb-0.5 font-semibold transition-colors border-b-[1px] border-primary hover:border-secondary',
		className,
	);
	const isInternalProp = isInternal ? { isInternal } : {};
	const relProp = rel ? { rel } : {};

	return (
		<LinkWrapper
			{...{
				text,
				to,
				...isInternalProp,
				...relProp,
				...classNameProps,
			}}
		>
			{text}
		</LinkWrapper>
	);
}
