/*
	Reusable input component for multiline text
	-------------------------------------------
*/

import { useCallback } from 'react';
import type {
	InputElementRenderFunction,
	InputInterface,
	InputOptions,
} from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import BaseInput from './base-input';

interface Props extends InputInterface {
	inputOptions?: {
		rows?: number;
		placeholder?: string;
	} & InputOptions;
}

const defaultInputOptions = {
	rows: 3,
};

export default function MultilineTextInput({
	inputClassName = '',
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
		)) as InputElementRenderFunction,
		[classNameProps, inputOptions],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
