/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/


import React from 'react';
import { PropsWithClassName, InputElementRenderFunction, InputValidationOptions } from '../../common/types';
import Alert from '../ghost-alert';
import { FieldErrors, UseFormRegister, } from 'react-hook-form';


interface BaseInputInterface extends PropsWithClassName {
	labelClassName?: string;
	name: string;
	label: string;
	renderInput: InputElementRenderFunction;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validationOptions: InputValidationOptions;
}

export default function BaseInput({ className = '', labelClassName = '', name, label, renderInput, register, errors, validationOptions }: BaseInputInterface) {
	const errorMsg = (() => {
		switch (errors[name]?.type) {
			case 'required':
				return 'This field is required';
			case 'minLength':
				return `This field must be at least ${validationOptions.minLength} characters long`;
			case 'maxLength':
				return `This field must be at most ${validationOptions.maxLength} characters long`;
			case 'pattern':
				return 'This field doesn\'t match the expected pattern';
			default:
				return 'This field is invalid';
		}
	})();
	const inputElement = renderInput(register(name, validationOptions));

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
