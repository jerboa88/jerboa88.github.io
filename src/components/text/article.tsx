/*
	An article component for auto-styling text
	------------------------------------------
*/

import domPurify from 'isomorphic-dompurify';
import type { PropsWithChildren } from 'react';
import { getClassNameProps } from '../../common/utils';
import type { PropsWithClassName } from '../../types/types';

interface Props extends PropsWithClassName, PropsWithChildren {
	html?: string;
}

export function Article({ className, children, html }: Props) {
	const classNameProps = getClassNameProps(
		'prose dark:prose-invert max-w-none', // General styles
		'prose-a:no-underline prose-a:pb-0.5 [&:not(.anchor)]:prose-a:border-b-[1px] prose-a:transition-colors prose-a:font-semibold prose-a:border-primary hover:prose-a:border-secondary', // Link styles
		'[&_.anchor_svg]:transition-colors [&_.anchor_svg]:target:prose-headings:visible [&_.anchor_svg]:target:prose-headings:fill-primary', // Anchor styles
		className,
	);

	if (html) {
		return (
			<article
				// biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is not user provided and is sanitized using DOMPurify
				dangerouslySetInnerHTML={{ __html: domPurify.sanitize(html) }}
				{...classNameProps}
			/>
		);
	}

	return <article {...classNameProps}>{children}</article>;
}
