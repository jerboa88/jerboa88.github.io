/*
	Contact form component
	----------------------
*/


import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LayoutGroup, motion } from 'framer-motion';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName, InputValidationOptions } from '../../common/types';
import TextInput from './text-input';
import MultilineTextInput from './multiline-text-input';
import SolidButton from './solid-button';
import Checkbox from './checkbox';


// Options passed to the input components themselves
const inputOptions = {
	name: {
		autoComplete: 'name',
	},
	email: {
		type: 'email',
		autoComplete: 'email',
	},
	_gotcha: {
		tabIndex: -1,
		autoComplete: 'off',
	}
};

enum FormState {
	Idle,
	Busy,
	Submitted,
	Error,
}

// Allowed fields for the contact form
interface ContactFormFieldsInterface {
	name: string;
	email: string;
	message: string;
	_gotcha?: 'on';
}

export default function ContactForm({ className = '' }: PropsWithClassName) {
	const [formState, setFormState] = React.useState<FormState>(FormState.Idle);

	// Options passed to React Hook Form for input validation
	const validationOptions = {
		name: {
			maxLength: 50,
			required: true,
			disabled: formState === FormState.Busy,
		} as InputValidationOptions,
		email: {
			maxLength: 50,
			pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
			required: true,
			disabled: formState === FormState.Busy,
		} as InputValidationOptions,
		message: {
			minLength: 30,
			maxLength: 3000,
			required: true,
			disabled: formState === FormState.Busy,
		} as InputValidationOptions
	};
	const {
		register,
		formState: {
			errors
		},
		handleSubmit,
	} = useForm<ContactFormFieldsInterface>();

	const submitButtonProps = (formState === FormState.Busy) ? {
		iconClassName: 'animate-spin',
		icon: faCircleNotch,
		disabled: true,
	} : {
		icon: faPaperPlane,
		text: 'Send',
	};

	const onSubmit: SubmitHandler<ContactFormFieldsInterface> = async formData => {
		setFormState(FormState.Busy);

		// TODO: Implement form submission here
	}

	return (
		<motion.form layout method="post" onSubmit={handleSubmit(onSubmit)} className={`w-full max-w-xl p-0 sm:p-8 flex flex-col gap-4 ${className}`}>
			<LayoutGroup>
				<TextInput name="name" label="Name" register={register} errors={errors} validationOptions={validationOptions.name} className="w-full" layout="position" />
				<TextInput name="email" label="Email" register={register} errors={errors} inputOptions={inputOptions.email} validationOptions={validationOptions.email} className="w-full" layout="position" />
				<MultilineTextInput name="message" label="Message" register={register} errors={errors} validationOptions={validationOptions.message} className="w-full" layout="position" />
				<SolidButton type="submit" className="w-full mt-2" {...submitButtonProps} layout="position" layoutRoot />
				<Checkbox name="_gotcha" register={register} errors={errors} className="hidden" />
			</LayoutGroup>
		</motion.form>
	);
}
