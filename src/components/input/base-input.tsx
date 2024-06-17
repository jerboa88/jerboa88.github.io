/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/

import { motion } from 'framer-motion';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
	AlertType,
	type InputElementRenderFunction,
	type InputValidationOptions,
	type PropsWithClassName,
	type PropsWithLayoutAnimations,
} from '../../common/types';
import { getClassNameProps, getOrDefault } from '../../common/utilities';
import { GhostAlert } from '../ghost-alert';

interface BaseInput extends PropsWithClassName, PropsWithLayoutAnimations {
	labelClassName?: string;
	name: string;
	label?: string;
	renderInput: InputElementRenderFunction;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validationOptions?: InputValidationOptions;
}

export function BaseInput({
	className,
	labelClassName,
	name,
	label = '',
	renderInput,
	register,
	errors,
	validationOptions,
	layout,
	layoutRoot,
}: BaseInput) {
	const labelClassNameProps = getClassNameProps('z-20 form-control', className);
	const spanClassNameProps = getClassNameProps(
		'justify-start label label-text',
		labelClassName,
	);
	const errorMessages = {
		required: 'This field is required',
		minLength: `This field must be at least ${validationOptions?.minLength} characters long`,
		maxLength: `This field must be at most ${validationOptions?.maxLength} characters long`,
		pattern: "This field doesn't match the expected pattern",
	};
	const errorMsg = getOrDefault(
		errorMessages,
		errors[name]?.type,
		'This field is invalid',
	);
	const inputElement = renderInput(register(name, validationOptions));

	return (
		<motion.label {...{ layout, layoutRoot, ...labelClassNameProps }}>
			<span {...spanClassNameProps}>{label}</span>
			<div className="backdrop-blur bg-glass">{inputElement}</div>
			<GhostAlert
				type={AlertType.Error}
				text={errorMsg}
				className="mt-4"
				show={!!errors[name]}
			/>
		</motion.label>
	);
}
