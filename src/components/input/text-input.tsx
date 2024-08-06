/*
	Reusable input component for single line text
	---------------------------------------------
*/

import { useCallback } from 'react';
import { getClassNameProps } from '../../common/utils';
import type {
	Input,
	InputElementRenderFunction,
	InputOptions,
} from '../../types/types';
import { BaseInput } from './base-input';

export interface Props extends Input {
	inputOptions?: {
		type?: string;
		placeholder?: string;
	} & InputOptions;
}

const defaultInputOptions = {
	type: 'text',
};

export function TextInput({
	inputClassName,
	name,
	inputOptions = defaultInputOptions,
	errors,
	...remainingProps
}: Props) {
	const classNameProps = getClassNameProps(
		'input border-2 border-base-content/5 w-full mix-blend-overlay bg-transparent shadow-md',
		!!errors[name] && 'input-error',
		inputClassName,
	);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<input {...{ ...classNameProps, ...registerObj, ...inputOptions }} />
		)) as InputElementRenderFunction,
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
