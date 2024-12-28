/*
	A template for an input component with validation
	This should not be used directly, but rather as a base for other input components.
	----------------------------------------------------------------------------------
*/

import { motion } from 'motion/react';
import type { FieldValues } from 'react-hook-form';
import {
	AlertType,
	type InputElementRenderFn,
} from '../../types/components.ts';
import type {
	Input,
	PropsWithClassName,
	PropsWithLayoutAnimations,
} from '../../types/components.ts';
import {
	getClassNameProps,
	getOrDefault,
	isDefined,
} from '../../utils/other.ts';
import { GhostAlert } from '../ghost-alert.tsx';

interface Props<T extends FieldValues>
	extends PropsWithClassName,
		PropsWithLayoutAnimations,
		Omit<Input<T>, 'inputClassName'> {
	renderInput: InputElementRenderFn;
}

export function BaseInput<T extends FieldValues>({
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
}: Props<T>) {
	const containerClassNameProps = getClassNameProps(
		'z-20 form-control',
		className,
	);
	const labelClassNameProps = getClassNameProps(
		'justify-start label label-text',
		labelClassName,
	);
	const layoutProp = isDefined(layout) ? { layout } : {};
	const layoutRootProp = isDefined(layoutRoot) ? { layoutRoot } : {};
	const errorMessages = {
		required: 'This field is required',
		minLength: `This field must be at least ${validationOptions?.minLength} characters long`,
		maxLength: `This field must be at most ${validationOptions?.maxLength} characters long`,
		pattern: "This field doesn't match the expected pattern",
	};
	const errorMsg = getOrDefault(
		errorMessages,
		errors[name]?.type as keyof typeof errorMessages,
		'This field is invalid',
	);
	const inputElement = renderInput(register(name, validationOptions));

	return (
		<motion.div
			{...{ ...layoutProp, ...layoutRootProp, ...containerClassNameProps }}
		>
			<label htmlFor={name} {...labelClassNameProps}>
				{label}
			</label>
			<div className="backdrop-blur bg-glass">{inputElement}</div>
			<GhostAlert
				type={AlertType.Error}
				text={errorMsg}
				className="mt-4"
				show={!!errors[name]}
			/>
		</motion.div>
	);
}
