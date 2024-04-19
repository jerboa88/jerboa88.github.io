/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/


import React from 'react';
import { InputInterface } from '../../common/types';
import Alert from '../ghost-alert';


export default function BaseInput({ className = '', labelClassName = '', inputClassName = '', name, label, type = 'text', placeholder = '', register, errors, minLength, maxLength, pattern, required = false, disabled = false, ...remainingProps }: InputInterface) {
	const errorMsg = (() => {
		switch (errors[name]?.type) {
			case 'required':
				return 'This field is required';
			case 'minLength':
				return `This field must be at least ${minLength} characters long`;
			case 'maxLength':
				return `This field must be at most ${maxLength} characters long`;
			case 'pattern':
				return 'This field doesn\'t match the expected pattern';
			default:
				return 'This field is invalid';
		}
	})();
	let inputElement = (
		<input {...register(name, { minLength, maxLength, pattern, required, disabled })} className={inputClassName} {...{ type, placeholder, ...remainingProps }} />
	);

	if (type === 'textarea') {
		inputElement = (
			<textarea {...register(name, { minLength, maxLength, pattern, required, disabled })} className={inputClassName} {...{ placeholder, ...remainingProps }} />
		);
	}

	return (
		<label className={`form-control ${className}`}>
			<span className={`label label-text justify-start ${labelClassName}`}>
				{label}
			</span>
			{inputElement}
			{errors[name] && (
				<Alert type="error" text={errorMsg} className="mt-4" />
			)}
		</label>
	);
}
