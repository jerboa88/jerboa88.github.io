/*
	Reusable checkbox component
	---------------------------
*/

import { useCallback } from 'react';
import type {
	Input,
	InputElementRenderFn,
	InputOptions,
} from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { BaseInput } from './base-input.tsx';

interface Props extends Input {
	inputOptions?: {
		defaultChecked?: boolean;
	} & InputOptions;
}

export function Checkbox({
	inputClassName,
	name,
	inputOptions,
	errors,
	...remainingProps
}: Props) {
	const classNameProps = getClassNameProps('checkbox', inputClassName);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<input
				type="checkbox"
				{...{ ...classNameProps, ...registerObj, ...inputOptions }}
			/>
		)) as InputElementRenderFn,
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
