/*
	Contact form component
	----------------------
*/

import Botpoison from '@botpoison/browser';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { getExternalServices } from '../../common/config-manager';
import {
	getClassNameProps,
	getOrDefault,
	getStatusCodeDescription,
} from '../../common/utils/other';
import {
	AlertType,
	type InputValidationOptions,
	TooltipPosition,
} from '../../types/components';
import type { PropsWithClassName } from '../../types/components';
import { GhostAlert } from '../ghost-alert';
import { Checkbox } from './checkbox';
import { MultilineTextInput } from './multiline-text-input';
import { SolidButton } from './solid-button';
import { TextInput } from './text-input';

// Types

enum FormState {
	Idle = 0,
	Busy = 1,
	Submitted = 2,
	Error = 3,
}

// Allowed fields for the contact form
interface ContactFormFields {
	name: string;
	email: string;
	message: string;
	_gotcha?: 'on';
}

// Constants

const ALERT_DURATION_MS = 5000;

const ALERT_PROPS = {
	[FormState.Submitted]: {
		type: AlertType.Success,
		text: 'Message sent successfully!',
		show: true,
	},
	[FormState.Error]: {
		type: AlertType.Error,
		text: 'Oof, something went wrong during form submission. Please try again later.',
		show: true,
	},
} as const;

const ALERT_PROPS_DEFAULT = {
	text: '',
	show: false,
} as const;

const SUBMIT_BUTTON_PROPS_BUSY = {
	iconClassName: 'animate-spin',
	icon: faCircleNotch,
	disabled: true,
} as const;

const SUBMIT_BUTTON_PROPS_DEFAULT = {
	icon: faPaperPlane,
	text: 'Send',
} as const;

const COMMON_TEXT_INPUT_PROPS = {
	className: 'w-full',
	layout: 'position',
} as const;

const INPUT_PROPS = {
	name: {
		name: 'name',
		label: 'Name',
		inputOptions: {
			autoComplete: 'name',
		},
		...COMMON_TEXT_INPUT_PROPS,
	},
	email: {
		name: 'email',
		label: 'Email',
		inputOptions: {
			type: 'email',
			autoComplete: 'email',
		},
		...COMMON_TEXT_INPUT_PROPS,
	},
	message: {
		name: 'message',
		label: 'Message',
		...COMMON_TEXT_INPUT_PROPS,
	},
	_gotcha: {
		name: '_gotcha',
		inputOptions: {
			tabIndex: -1,
			autoComplete: 'off',
		},
		className: 'hidden',
	},
} as const;

const EXTERNAL_SERVICES = getExternalServices();

const botpoison = new Botpoison({
	publicKey: EXTERNAL_SERVICES.botpoisonPublicKey,
});

function getValidationOptions(
	formState: FormState,
): Partial<Record<keyof ContactFormFields, InputValidationOptions>> {
	return {
		name: {
			maxLength: 50,
			required: true,
			disabled: formState === FormState.Busy,
		},
		email: {
			maxLength: 50,
			pattern:
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
			required: true,
			disabled: formState === FormState.Busy,
		},
		message: {
			minLength: 30,
			maxLength: 3000,
			required: true,
			disabled: formState === FormState.Busy,
		},
	};
}

// Compute the Botpoison solution. Returns a promise that resolves with the solution string
async function computeBotPoisonSolution() {
	console.debug('Computing Botpoison solution...');

	return new Promise<string>((resolve, reject) => {
		botpoison
			.challenge()
			.then(({ solution }) => {
				console.debug('Botpoison solution found');

				resolve(solution);
			})
			.catch(reject);
	});
}

export function ContactForm({ className }: PropsWithClassName) {
	const formClassNameProps = getClassNameProps(
		'flex flex-col gap-4 p-0 w-full max-w-xl sm:p-8',
		className,
	);

	const [formState, setFormState] = useState<FormState>(FormState.Idle);
	const [botpoisonSolution, setBotpoisonSolution] = useState<Promise<string>>();

	// Options passed to React Hook Form for input validation
	const validationOptions = getValidationOptions(formState);
	const submitButtonProps =
		formState === FormState.Busy
			? SUBMIT_BUTTON_PROPS_BUSY
			: SUBMIT_BUTTON_PROPS_DEFAULT;
	const alertProps = getOrDefault(ALERT_PROPS, formState, ALERT_PROPS_DEFAULT);

	const {
		formState: { errors },
		control,
		register,
		reset,
		handleSubmit,
	} = useForm<ContactFormFields>({ mode: 'onBlur' });
	const { isValid } = useFormState({ control });

	// Handle form submission errors
	const handleSubmissionError = (errorMsg: string) => {
		setFormState(FormState.Error);

		console.error(`Something went wrong during form submission. ${errorMsg}`);
	};

	const onSubmit: SubmitHandler<ContactFormFields> = async (formData) => {
		setFormState(FormState.Busy);

		console.debug('Waiting for Botpoison solution...');

		const requestBody = JSON.stringify({
			_botpoison: await botpoisonSolution,
			...formData,
		});

		console.debug('Submitting form with data:', requestBody);

		fetch(EXTERNAL_SERVICES.contactFormPostUrl, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
			},
			body: requestBody,
		})
			.then((response) => {
				if (!response.ok) {
					const statusText =
						response.statusText || getStatusCodeDescription(response.status);

					handleSubmissionError(
						`The server returned status code ${response.status} (${statusText})`,
					);

					return;
				}

				setFormState(FormState.Submitted);
				reset();
			})
			.catch((error) => {
				handleSubmissionError(`The following error was caught: ${error}`);
			});
	};

	// Compute Botpoison solution as soon as the form is valid
	useEffect(() => {
		if (isValid && !botpoisonSolution) {
			setBotpoisonSolution(computeBotPoisonSolution());
		}
	}, [isValid, botpoisonSolution]);

	// Reset the form state a few seconds after submission
	useEffect(() => {
		if (formState === FormState.Submitted || formState === FormState.Error) {
			const timeout = setTimeout(() => {
				setFormState(FormState.Idle);
			}, ALERT_DURATION_MS);

			return () => clearTimeout(timeout);
		}
	}, [formState]);

	return (
		<motion.form
			method="post"
			onSubmit={handleSubmit(onSubmit)}
			{...formClassNameProps}
			layout
		>
			<LayoutGroup>
				<TextInput
					{...{ register, errors, ...INPUT_PROPS.name }}
					validationOptions={validationOptions.name}
				/>
				<TextInput
					{...{ register, errors, ...INPUT_PROPS.email }}
					validationOptions={validationOptions.email}
				/>
				<MultilineTextInput
					{...{ register, errors, ...INPUT_PROPS.message }}
					validationOptions={validationOptions.message}
				/>
				<Checkbox {...{ register, errors, ...INPUT_PROPS._gotcha }} />
				<SolidButton
					type="submit"
					layout="position"
					tooltipText="Send message"
					tooltipPosition={TooltipPosition.Bottom}
					cardClassName="mt-2 z-20"
					tooltipClassName="w-full"
					className="w-full"
					layoutRoot
					{...submitButtonProps}
				/>
				<GhostAlert {...alertProps} />
			</LayoutGroup>
		</motion.form>
	);
}
