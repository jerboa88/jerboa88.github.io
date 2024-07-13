/*
	Reusable checkbox component
	---------------------------
*/

import { useCallback } from 'react';
import type {
	Input,
	InputElementRenderFunction,
	InputOptions,
} from '../../common/types';
import { getClassNameProps } from '../../common/utils';
import { BaseInput } from './base-input';

export interface Props extends Input {
	inputOptions?: {
		defaultChecked?: boolean;
	} & InputOptions;
}

export function Checkbox({
	inputClassName,
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
		[],
	);

	return <BaseInput {...{ renderInput, name, errors, ...remainingProps }} />;
}
