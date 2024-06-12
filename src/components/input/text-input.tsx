/*
	Reusable input component for single line text
	---------------------------------------------
*/


import React, { useCallback } from 'react';
import { InputElementRenderFunction, InputInterface, InputOptions } from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import BaseInput from './base-input';


export interface Props extends InputInterface {
	inputOptions?: {
		type?: string;
		placeholder?: string;
	} & InputOptions;
}

const defaultInputOptions = {
	type: 'text'
};

export default function TextInput({ inputClassName = '', name, inputOptions = defaultInputOptions, errors, ...remainingProps }: Props) {
	const classNameProps = getClassNameProps(
		'input border-2 border-base-content/5 w-full mix-blend-overlay bg-transparent shadow-md',
		!!errors[name] && 'input-error',
		inputClassName,
	);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback((registerObj => (
		<input {...{ ...classNameProps, ...registerObj, ...inputOptions }} />
	)) as InputElementRenderFunction, [classNameProps, inputOptions]);

	return (
		<BaseInput {...{ renderInput, name, errors, ...remainingProps }} />
	);
}
