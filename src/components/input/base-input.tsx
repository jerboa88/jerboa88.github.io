/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/

import { motion } from 'framer-motion';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
	AlertType,
	type InputElementRenderFn,
	type InputValidationOptions,
} from '../../types/components.ts';
import type {
	PropsWithClassName,
	PropsWithLayoutAnimations,
} from '../../types/components.ts';
import { getClassNameProps, getOrDefault } from '../../utils/other.ts';
import { GhostAlert } from '../ghost-alert.tsx';

interface BaseInput extends PropsWithClassName, PropsWithLayoutAnimations {
	labelClassName?: string;
	name: string;
	label?: string;
	renderInput: InputElementRenderFn;
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
	const layoutProp = layout ? { layout } : {};
	const layoutRootProp = layoutRoot ? { layoutRoot } : {};
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
		<motion.label
			{...{ ...layoutProp, ...layoutRootProp, ...labelClassNameProps }}
		>
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
