/*
	Alert widget
	------------
*/


import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AlertType, PropsWithClassName } from '../common/types';
import { withFadeInAnimation } from '../common/utilities';


interface GhostAlertPropsInterface extends PropsWithClassName {
	type?: AlertType;
	text: string;
	show?: boolean;
}

export default function GhostAlert({ className = '', type, text, show = true }: GhostAlertPropsInterface) {
	let typeStyles = 'alert-info text-info';
	let icon = faCircleInfo;

	if (type === AlertType.Success) {
		typeStyles = 'alert-success text-success';
		icon = faCircleCheck;
	} else if (type === AlertType.Warning) {
		typeStyles = 'alert-warning text-warning';
		icon = faTriangleExclamation;
	} else if (type === AlertType.Error) {
		typeStyles = 'alert-error text-error';
		icon = faCircleExclamation;
	}

	return (
		<AnimatePresence>
			{show && (
				<motion.div key={type} {...withFadeInAnimation} role="alert" className={`flex flex-row p-0 pl-1 bg-transparent border-none alert w-fit ${typeStyles} ${className}`}>
					<FontAwesomeIcon icon={icon} />
					<span>
						{text}
					</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
