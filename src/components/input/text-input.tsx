/*
	Reusable input component for single line text
	---------------------------------------------
*/


import React from 'react';
import { InputInterface } from '../../common/types';


export default function TextInput({ className = '', labelClassName = '', inputClassName = '', name, label, type = 'text', placeholder = '', required = false, disabled = false }: InputInterface) {
	return (
		<label className={`form-control ${className}`}>
			<span className={`label label-text ${labelClassName}`}>{label}</span>
			<input name={name} type={type} placeholder={placeholder} required={required} disabled={disabled} className={`input input-bordered w-full bg-base-200 ${inputClassName}`} />
		</label>
	);
}
