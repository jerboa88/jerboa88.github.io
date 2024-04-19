/*
	Reusable input component for multiline text
	-------------------------------------------
*/


import React from 'react';
import { InputInterface } from '../../common/types';
import BaseInput from './base-input';


interface MultilineTextInputPropsInterface extends InputInterface {
	rows?: number;
}

export default function TextInput({ inputClassName = '', name, errors, ...remainingProps }: MultilineTextInputPropsInterface) {
	const errorStyles = errors[name] ? 'textarea-error' : '';

	return (
		<BaseInput type="textarea" inputClassName={`textarea textarea-bordered w-full bg-base-200 text-base ${errorStyles} ${inputClassName}`} {...{ name, errors, ...remainingProps }} />
	);
}
