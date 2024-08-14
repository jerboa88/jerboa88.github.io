/*
	Reusable input component for single line text
	---------------------------------------------
*/

import { useCallback } from 'react';
import { getClassNameProps } from '../../common/utils/other';
import type {
	Input,
	InputElementRenderFunction,
	InputOptions,
} from '../../types/components';
import { BaseInput } from './base-input';

// Types

interface Props extends Input {
	inputOptions?: {
		type?: string;
		placeholder?: string;
	} & InputOptions;
}

export function TextInput({
	inputClassName,
	name,
	inputOptions = {
		type: 'text',
	},
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
