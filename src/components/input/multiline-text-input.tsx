/*
	Reusable input component for multiline text
	-------------------------------------------
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
		rows?: number;
		placeholder?: string;
	} & InputOptions;
}

const defaultInputOptions = {
	rows: 3,
};

export function MultilineTextInput({
	inputClassName,
	name,
	inputOptions = defaultInputOptions,
	errors,
	...remainingProps
}: Props) {
	const classNameProps = getClassNameProps(
		'textarea border-2 border-base-content/5 w-full mix-blend-overlay bg-transparent text-base shadow-md align-top',
		!!errors[name] && 'textarea-error',
		inputClassName,
	);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<textarea {...{ ...classNameProps, ...registerObj, ...inputOptions }} />
		)) as InputElementRenderFn,
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
