/*
	An inline list of tags
	----------------------
*/

import type { PropsWithClassName } from '../types/components.ts';
import { Tag } from './tag.tsx';

interface Props extends PropsWithClassName {
	titles: string[];
}

export function Tags({ titles }: Props) {
	return (
		<div className="flex flex-row justify-start items-center gap-2 flex-wrap">
			{titles.map((title) => (
				<Tag key={title} text={title} />
			))}
		</div>
	);
}
