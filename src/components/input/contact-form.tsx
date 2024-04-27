/*
	Contact form component
	----------------------
*/


import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LayoutGroup, motion } from 'framer-motion';
import Botpoison from '@botpoison/browser';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { PropsWithClassName, InputValidationOptions, AlertType } from '../../common/types';
import { getStatusCodeDescription } from '../../common/utilities';
import TextInput from './text-input';
import MultilineTextInput from './multiline-text-input';
import SolidButton from './solid-button';
import GhostAlert from '../ghost-alert';
import Checkbox from './checkbox';
import ConfigManager from '../../common/config-manager';


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
	const alertDuration = 5000;
	const configManager = new ConfigManager();
	const {
		botpoisonPublicKey,
		contactFormPostUrl,
	} = configManager.getExternalServices();

	const botpoison = new Botpoison({
		publicKey: botpoisonPublicKey,
	});

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
		formState: {
			errors
		},
		register,
		reset,
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

	const alertProps = (() => {
		switch (formState) {
			case FormState.Submitted:
				return {
					type: AlertType.Success,
					text: 'Message sent successfully!',
					show: true,
				};
			case FormState.Error:
				return {
					type: AlertType.Error,
					text: 'Oof, something went wrong during form submission. Please try again later.',
					show: true,
				};
			default:
				return {
					text: '',
					show: false,
				};
		}
	})();

	// Function that sets form state to error and prints an error message to the console
	// This function is called when form submission fails
	const handleSubmissionError = (errorMsg: string) => {
		setFormState(FormState.Error);

		console.error(`Something went wrong during form submission. ${errorMsg}`);
	}

	const onSubmit: SubmitHandler<ContactFormFieldsInterface> = async formData => {
		setFormState(FormState.Busy);

		// Compute hash for the Botpoison challenge
		const { solution } = await botpoison.challenge();
		const requestBody = JSON.stringify({
			_botpoison: solution,
			...formData,
		});

		console.debug('Submitting form with data:', requestBody);

		fetch(contactFormPostUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: requestBody,
		})
			.then(response => {
				if (!response.ok) {
					const statusText = response.statusText || getStatusCodeDescription(response.status);

					handleSubmissionError(`The server returned status code ${response.status} (${statusText})`);

					return;
				}

				setFormState(FormState.Submitted);
				reset();
			})
			.catch(error => {
				handleSubmissionError(`The following error was caught: ${error}`);
			});
	}

	// After submission, reset the form state after a few seconds
	useEffect(() => {
		if (formState === FormState.Submitted || formState === FormState.Error) {
			const timeout = setTimeout(() => {
				setFormState(FormState.Idle);

				// TODO: Clear form fields here
			}, alertDuration);

			return () => clearTimeout(timeout);
		}
	}, [formState]);

	return (
		<motion.form layout method="post" onSubmit={handleSubmit(onSubmit)} className={`w-full max-w-xl p-0 sm:p-8 flex flex-col gap-4 ${className}`}>
			<LayoutGroup>
				<TextInput name="name" label="Name" register={register} errors={errors} validationOptions={validationOptions.name} className="w-full" layout="position" />
				<TextInput name="email" label="Email" register={register} errors={errors} inputOptions={inputOptions.email} validationOptions={validationOptions.email} className="w-full" layout="position" />
				<MultilineTextInput name="message" label="Message" register={register} errors={errors} validationOptions={validationOptions.message} className="w-full" layout="position" />
				<SolidButton type="submit" className="w-full mt-2" {...submitButtonProps} layout="position" layoutRoot />
				<Checkbox name="_gotcha" register={register} errors={errors} className="hidden" />
				<GhostAlert {...alertProps} />
			</LayoutGroup>
		</motion.form>
	);
}
