/*
	A component to display the page number in the corner of printed pages
	---------------------------------------------------------------------
*/

import type { PropsWithClassName } from '../types/components.ts';
import { getClassNameProps } from '../utils/other.ts';

// Types

interface Props extends PropsWithClassName {
	numOfPages: number;
}

export function PageCounter({ className, numOfPages }: Props) {
	const classNameProps = getClassNameProps(
		'absolute top-0 right-0 hidden print:block',
		className,
	);
	const pagesArray = new Array(numOfPages);

	return (
		<div {...classNameProps}>
			{pagesArray.map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
				<div key={index} className="h-screen break-after-page flex items-end">
					<span>
						Page {index + 1} of {numOfPages}
					</span>
				</div>
			))}
		</div>
	);
}
