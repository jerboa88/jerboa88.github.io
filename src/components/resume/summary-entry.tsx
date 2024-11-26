/*
	A single resume entry for displaying a list of values
	-----------------------------------------------------
*/

import { Tags } from '../tags.tsx';

interface Props {
	title: string;
	items: Capitalize<string>[];
}

export function ResumeSummaryEntry({ title, items }: Props) {
	if (items.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-row justify-start items-center gap-2 flex-wrap break-inside-avoid-page">
			<span className="font-bold capitalize">{title}:</span>
			<Tags titles={items} />
		</div>
	);
}
