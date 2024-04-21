/*
	Contact form component
	----------------------
*/


import React from 'react';
import { PropsWithClassName, InputValidationOptions } from '../../common/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextInput from './text-input';
import MultilineTextInput from './multiline-text-input';
import SolidButton from './solid-button';


// Allowed fields for the contact form
export interface ContactFormFieldsInterface {
	name: string;
	email: string;
	message: string;
}

export default function ContactForm({ className = '' }: PropsWithClassName) {
	// Options passed to the input components themselves
	const inputOptions = {
		email: {
			type: 'email',
		}
	}
	// Options passed to React Hook Form for input validation
	const validationOptions = {
		name: {
			maxLength: 50,
			required: true,
		} as InputValidationOptions,
		email: {
			maxLength: 50,
			pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
			required: true,
		} as InputValidationOptions,
		message: {
			minLength: 30,
			maxLength: 3000,
			required: true,
		} as InputValidationOptions
	};
	const {
		register,
		formState: {
			errors
		},
		handleSubmit,
	} = useForm<ContactFormFieldsInterface>();

	const onSubmit: SubmitHandler<ContactFormFieldsInterface> = data => {
		// TODO: Implement form submission here
	}

	return (
		// TODO: Remove this line
		// <form action="https://submit-form.com/echo" method="post" onSubmit={handleSubmit(onSubmit)} className={`w-full max-w-lg p-0 sm:p-8 flex flex-col gap-4 ${className}`}>
		<form method="post" onSubmit={handleSubmit(onSubmit)} className={`w-full max-w-lg p-0 sm:p-8 flex flex-col gap-4 ${className}`}>
			<TextInput name="name" label="Name" register={register} errors={errors} validationOptions={validationOptions.name} className="w-full" />
			<TextInput name="email" label="Email" register={register} errors={errors} inputOptions={inputOptions.email} validationOptions={validationOptions.email} className="w-full" />
			<MultilineTextInput name="message" label="Message" register={register} errors={errors} validationOptions={validationOptions.message} className="w-full" />
			<SolidButton type="submit" icon={faPaperPlane} text="Send" className="w-full mt-2" />
		</form>
	);
}
