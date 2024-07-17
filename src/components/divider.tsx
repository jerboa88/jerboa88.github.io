/*
	Horizontal rule component
	-------------------------
*/

import type { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utils';

export function Divider({ className }: PropsWithClassName) {
	const classNameProps = getClassNameProps('m-0 h-auto divider', className);

	return <div {...classNameProps} />;
}
