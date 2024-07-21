/*
	A component to display the page number in the corner of printed pages
	---------------------------------------------------------------------
*/

import type { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utils';

// Types

interface Props extends PropsWithClassName {
	numOfPages: number;
}

export function PageCounter({ className, numOfPages }: Props) {
	const classNameProps = getClassNameProps(
		'absolute top-0 right-0 hidden print:block',
		className,
	);

	return (
		<div {...classNameProps}>
			{Array(numOfPages)
				.fill(0)
				.map((_, index) => (
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
