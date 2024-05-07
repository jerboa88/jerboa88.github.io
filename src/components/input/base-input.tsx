/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/


import React from 'react';
import { FieldErrors, UseFormRegister, } from 'react-hook-form';
import { motion } from 'framer-motion';
import { PropsWithClassName, PropsWithLayoutAnimations, InputElementRenderFunction, InputValidationOptions, AlertType } from '../../common/types';
import GhostAlert from '../ghost-alert';


interface BaseInputInterface extends PropsWithClassName, PropsWithLayoutAnimations {
	labelClassName?: string;
	name: string;
	label?: string;
	renderInput: InputElementRenderFunction;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validationOptions?: InputValidationOptions;
}

export default function BaseInput({ className = '', labelClassName = '', name, label = '', renderInput, register, errors, validationOptions, layout, layoutRoot }: BaseInputInterface) {
	const errorMsg = (() => {
		switch (errors[name]?.type) {
			case 'required':
				return 'This field is required';
			case 'minLength':
				return `This field must be at least ${validationOptions?.minLength} characters long`;
			case 'maxLength':
				return `This field must be at most ${validationOptions?.maxLength} characters long`;
			case 'pattern':
				return 'This field doesn\'t match the expected pattern';
			default:
				return 'This field is invalid';
		}
	})();
	const inputElement = renderInput(register(name, validationOptions));

	return (
		<motion.label layout={layout} layoutRoot={layoutRoot} className={`z-20 form-control ${className}`}>
			<span className={`justify-start label label-text ${labelClassName}`}>
				{label}
			</span>
			{inputElement}
			<GhostAlert type={AlertType.Error} text={errorMsg} className="mt-4" show={!!errors[name]} />
		</motion.label>
	);
}
