/*
	Horizontal rule component
	-------------------------
*/

import { getClassNameProps } from '../common/utils';
import type { PropsWithClassName } from '../types/components';

export function Divider({ className }: PropsWithClassName) {
	const classNameProps = getClassNameProps('m-0 h-auto divider', className);

	return <div {...classNameProps} />;
}
