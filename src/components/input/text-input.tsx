/*
	Reusable input component for single line text
	---------------------------------------------
*/


import React from 'react';
import { InputInterface } from '../../common/types';
import BaseInput from './base-input';


export default function TextInput({ inputClassName = '', name, errors, ...remainingProps }: InputInterface) {
	const errorStyles = errors[name] ? 'input-error' : '';

	return (
		<BaseInput inputClassName={`input input-bordered w-full bg-base-200 ${errorStyles} ${inputClassName}`} {...{ name, errors, ...remainingProps }} />
	);
}
