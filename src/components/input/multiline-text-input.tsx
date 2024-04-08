/*
	Reusable input component for multiline text
	-------------------------------------------
*/


import React from 'react';


interface MultilineTextInputPropsInterface {
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	name: string;
	label: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
}

export default function MultilineTextInput({ className = '', labelClassName = '', inputClassName = '', name, label, placeholder = '', rows = 4, disabled = false }: MultilineTextInputPropsInterface) {
	return (
		<label className={`form-control ${className}`}>
			<span className={`label label-text ${labelClassName}`}>{label}</span>
			<textarea name={name} disabled={disabled} rows={rows} className={`textarea textarea-bordered w-full bg-base-200 text-base ${inputClassName}`} />
		</label>
	);
}
