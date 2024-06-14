/*
	Reusable checkbox component
	---------------------------
*/

import { useCallback } from 'react';
import type {
	InputElementRenderFunction,
	InputInterface,
	InputOptions,
} from '../../common/types';
import { getClassNameProps } from '../../common/utilities';
import BaseInput from './base-input';

export interface Props extends InputInterface {
	inputOptions?: {
		defaultChecked?: boolean;
	} & InputOptions;
}

export default function Checkbox({
	inputClassName = '',
	name,
	inputOptions,
	errors,
	...remainingProps
}: Props) {
	const classNameProps = getClassNameProps('checkbox', inputClassName);

	// A function for rendering the input element
	// This will be passed to the base input component and called from there
	const renderInput = useCallback(
		((registerObj) => (
			<input
				type="checkbox"
				{...{ ...classNameProps, ...registerObj, ...inputOptions }}
			/>
		)) as InputElementRenderFunction,
		[classNameProps, inputOptions],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
