/*
	An article component for auto-styling text
	------------------------------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../common/types';


interface ArticlePropsInterface extends PropsWithClassName, PropsWithChildren {
	html?: string | TrustedHTML;
}


export function Article({ className = '', children, html }: ArticlePropsInterface) {
	const styles = 'prose dark:prose-invert max-w-none';
	const linkStyles = 'prose-a:no-underline [&:not(.anchor)]:prose-a:border-b-[1px] prose-a:transition-colors prose-a:font-semibold prose-a:border-primary hover:prose-a:border-secondary';
	const anchorStyles = '[&_.anchor_svg]:transition-colors [&_.anchor_svg]:target:prose-headings:visible [&_.anchor_svg]:target:prose-headings:fill-primary';

	return (
		<article dangerouslySetInnerHTML={html ? { __html: html } : undefined} className={`${styles} ${linkStyles} ${anchorStyles} ${className}`}>
			{children}
		</article>
	);
}
