/*
	Horizontal rule component
	-------------------------
*/

import type { PropsWithClassName } from '../types/components.ts';
import { getClassNameProps } from '../utils/other.ts';

export function Divider({ className }: PropsWithClassName) {
	const classNameProps = getClassNameProps('m-0 h-auto divider', className);

	return <div {...classNameProps} />;
}
