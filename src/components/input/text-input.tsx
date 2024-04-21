/*
	Reusable input component for single line text
	---------------------------------------------
*/


import React, { useCallback } from 'react';
import { InputElementRenderFunction, InputInterface } from '../../common/types';
import BaseInput from './base-input';


export interface TextInputPropsInterface extends InputInterface {
	inputOptions?: {
		type?: string;
		placeholder?: string;
	};
}

const defaultInputOptions = {
	type: 'text'
};

export default function TextInput({ inputClassName = '', name, inputOptions = defaultInputOptions, errors, ...remainingProps }: TextInputPropsInterface) {
	const inputErrorStyles = errors[name] ? 'input-error' : '';
	const inputStyles = `input input-bordered w-full bg-base-200 ${inputErrorStyles} ${inputClassName}`;
	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback((registerObj => {
		return (
			<input className={inputStyles} {...registerObj} {...inputOptions} />
		);
	}) as InputElementRenderFunction, [inputStyles, inputOptions]);

	return (
		<BaseInput {...{ renderInput, name, errors, ...remainingProps }} />
	);
}
