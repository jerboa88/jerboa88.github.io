/*
	Reusable checkbox component
	---------------------------
*/

import { useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';
import type {
	Input,
	InputElementRenderFn,
	InputOptions,
} from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { BaseInput } from './base-input.tsx';

interface Props<T extends FieldValues> extends Input<T> {
	inputOptions?: {
		defaultChecked?: boolean;
	} & InputOptions;
}

export function Checkbox<T extends FieldValues>({
	inputClassName,
	name,
	inputOptions,
	errors,
	...remainingProps
}: Props<T>) {
	const classNameProps = getClassNameProps('checkbox', inputClassName);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<input
				type="checkbox"
				id={registerObj.name}
				{...{ ...classNameProps, ...registerObj, ...inputOptions }}
			/>
		)) as InputElementRenderFn,
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
