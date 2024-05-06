/*
	Reusable input component for multiline text
	-------------------------------------------
*/


import React, { useCallback } from 'react';
import { InputElementRenderFunction, InputInterface, InputOptions } from '../../common/types';
import BaseInput from './base-input';


interface MultilineTextInputPropsInterface extends InputInterface {
	inputOptions?: {
		rows?: number;
		placeholder?: string;
	} & InputOptions;
}

const defaultInputOptions = {
	rows: 3
};

export default function MultilineTextInput({ inputClassName = '', name, inputOptions = defaultInputOptions, errors, ...remainingProps }: MultilineTextInputPropsInterface) {
	const inputErrorStyles = errors[name] ? 'textarea-error' : '';
	const inputStyles = `textarea border-2 border-base-content/5 w-full bg-base-200 text-base ${inputErrorStyles} ${inputClassName}`;
	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback((registerObj => {
		return (
			<textarea className={inputStyles} {...registerObj} {...inputOptions} />
		);
	}) as InputElementRenderFunction, [inputStyles, inputOptions]);

	return (
		<BaseInput {...{ renderInput, name, errors, ...remainingProps }} />
	);
}
