/*
	An inline link component
	------------------------
*/

import type { LinkInterface, PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import LinkWrapper from './link-wrapper';

interface Props extends PropsWithClassName, LinkInterface {
	text: string;
}

export default function InlineLink({
	className,
	text,
	to,
	isInternal,
	rel,
}: Props) {
	const classNameProps = getClassNameProps(
		'pb-0.5 font-semibold transition-colors border-b-[1px] border-primary hover:border-secondary',
		className,
	);

	return (
		<LinkWrapper {...{ text, to, isInternal, rel, ...classNameProps }}>
			{text}
		</LinkWrapper>
	);
}
