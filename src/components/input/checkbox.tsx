/*
	Reusable checkbox component
	---------------------------
*/


import React, { useCallback } from 'react';
import { InputElementRenderFunction, InputInterface, InputOptions } from '../../common/types';
import BaseInput from './base-input';


export interface CheckboxPropsInterface extends InputInterface {
	inputOptions?: {
		defaultChecked?: boolean;
	} & InputOptions;
}

export default function Checkbox({ inputClassName = '', name, inputOptions, errors, ...remainingProps }: CheckboxPropsInterface) {
	const inputStyles = `checkbox ${inputClassName}`;
	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback((registerObj => {
		return (
			<input type="checkbox" className={inputStyles} {...registerObj} {...inputOptions} />
		);
	}) as InputElementRenderFunction, [inputStyles, inputOptions]);

	return (
		<BaseInput {...{ renderInput, name, errors, ...remainingProps }} />
	);
}
