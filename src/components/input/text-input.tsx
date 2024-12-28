/*
	Reusable input component for single line text
	---------------------------------------------
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

// Types

interface Props<T extends FieldValues> extends Input<T> {
	inputOptions?: {
		type?: string;
		placeholder?: string;
	} & InputOptions;
}

export function TextInput<T extends FieldValues>({
	inputClassName,
	name,
	inputOptions = {
		type: 'text',
	},
	errors,
	...remainingProps
}: Props<T>) {
	const classNameProps = getClassNameProps(
		'input border-2 border-base-content/5 w-full mix-blend-overlay bg-transparent shadow-md',
		!!errors[name] && 'input-error',
		inputClassName,
	);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<input
				id={registerObj.name}
				{...{ ...classNameProps, ...registerObj, ...inputOptions }}
			/>
		)) as InputElementRenderFn,
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
