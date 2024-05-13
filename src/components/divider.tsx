/*
	Horizontal rule component
	-------------------------
*/


import React from 'react';
import { PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utilities';


export default function SectionHeader({ className }: PropsWithClassName) {
	const classNameProps = getClassNameProps(
		'm-0 h-auto divider',
		className,
	);

	return (
		<div {...classNameProps} />
	);
}
