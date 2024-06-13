/*
	An article component for auto-styling text
	------------------------------------------
*/

import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';

interface Props extends PropsWithClassName, PropsWithChildren {
	html?: string | TrustedHTML;
}

export function Article({ className = '', children, html }: Props) {
	const classNameProps = getClassNameProps(
		'prose dark:prose-invert max-w-none', // General styles
		'prose-a:no-underline prose-a:pb-0.5 [&:not(.anchor)]:prose-a:border-b-[1px] prose-a:transition-colors prose-a:font-semibold prose-a:border-primary hover:prose-a:border-secondary', // Link styles
		'[&_.anchor_svg]:transition-colors [&_.anchor_svg]:target:prose-headings:visible [&_.anchor_svg]:target:prose-headings:fill-primary', // Anchor styles
		className,
	);

	return (
		<article
			dangerouslySetInnerHTML={html ? { __html: html } : undefined}
			{...classNameProps}
		>
			{children}
		</article>
	);
}
