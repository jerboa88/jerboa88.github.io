/*
	Alert widget
	------------
*/


import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AlertType, PropsWithClassName } from '../common/types';
import { FADE_IN_ANIMATION_PROPS } from '../common/constants';
import { getClassNameProps, getOrDefault } from '../common/utilities';


// Types

interface GhostAlertPropsInterface extends PropsWithClassName {
	type?: AlertType;
	text: string;
	show?: boolean;
}


// Constants

const ALERT_TYPE_STYLES = {
	[AlertType.Info]: 'alert-info text-info',
	[AlertType.Success]: 'alert-success text-success',
	[AlertType.Warning]: 'alert-warning text-warning',
	[AlertType.Error]: 'alert-error text-error',
}
const ALERT_TYPE_ICONS = {
	[AlertType.Info]: faCircleInfo,
	[AlertType.Success]: faCircleCheck,
	[AlertType.Warning]: faTriangleExclamation,
	[AlertType.Error]: faCircleExclamation,
}


export default function GhostAlert({ className = '', type, text, show = true }: GhostAlertPropsInterface) {
	const classNameProps = getClassNameProps(
		'flex flex-row p-0 pl-1 bg-transparent border-none alert w-fit',
		getOrDefault(ALERT_TYPE_STYLES, type, ALERT_TYPE_STYLES[AlertType.Info]),	// Styles per alert type
		className,
	);
	const icon = getOrDefault(ALERT_TYPE_ICONS, type, ALERT_TYPE_ICONS[AlertType.Info]);

	return (
		<AnimatePresence>
			{show && (
				<motion.div key={type} role="alert" {...FADE_IN_ANIMATION_PROPS} {...classNameProps}>
					<FontAwesomeIcon icon={icon} />
					<span>
						{text}
					</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
