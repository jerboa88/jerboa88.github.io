/*
	Alert widget
	------------
*/


import React from 'react';
import { PropsWithClassName } from '../common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


interface GhostAlertPropsInterface extends PropsWithClassName {
	type: 'info' | 'success' | 'warning' | 'error';
	text: string;
}

export default function GhostAlert({ className = '', type, text }: GhostAlertPropsInterface) {
	let typeStyles = 'alert-info text-info';
	let icon = faCircleInfo;

	if (type === 'success') {
		typeStyles = 'alert-success text-success';
		icon = faCircleCheck;
	} else if (type === 'warning') {
		typeStyles = 'alert-warning text-warning';
		icon = faTriangleExclamation;
	} else if (type === 'error') {
		typeStyles = 'alert-error text-error';
		icon = faCircleExclamation;
	}

	return (
		<div role="alert" className={`alert p-0 pl-1 gap-2 bg-transparent border-none rounded-lg ${typeStyles} ${className}`}>
			<FontAwesomeIcon icon={icon} />
			<span>
				{text}
			</span>
		</div>
	);
}
