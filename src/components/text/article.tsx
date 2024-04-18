/*
	An article component for auto-styling text
	------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassname } from '../../common/types';


interface ArticlePropsInterface extends PropsWithClassname, PropsWithChildren {
	html?: string | TrustedHTML;
}


export function Article({ className = '', children, html }: ArticlePropsInterface) {
	const generalStyles = 'prose dark:prose-invert max-w-none';
	const linkStyles = 'prose-a:no-underline [&:not(.anchor)]:prose-a:border-b-[1px] prose-a:transition-colors prose-a:font-semibold prose-a:border-primary hover:prose-a:border-secondary';
	const anchorStyles = '[&_.anchor_svg]:transition-colors [&_.anchor_svg]:target:prose-headings:visible [&_.anchor_svg]:target:prose-headings:fill-primary';

	return (
		<article dangerouslySetInnerHTML={html ? { __html: html } : undefined} className={`${generalStyles} ${linkStyles} ${anchorStyles} ${className}`}>
			{children}
		</article>
	);
}
