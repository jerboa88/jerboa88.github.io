/*
	Alert widget
	------------
*/

import {
	faCircleCheck,
	faCircleExclamation,
	faCircleInfo,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { FADE_IN_ANIMATION_PROPS } from '../common/constants';
import { AlertType, type PropsWithClassName } from '../common/types';
import { getClassNameProps } from '../common/utils';

// Types

interface Props extends PropsWithClassName {
	type?: AlertType;
	text: string;
	show?: boolean;
}

// Constants

const ALERT_TYPE_STYLES_MAP = {
	[AlertType.Info]: 'alert-info text-info',
	[AlertType.Success]: 'alert-success text-success',
	[AlertType.Warning]: 'alert-warning text-warning',
	[AlertType.Error]: 'alert-error text-error',
};
const ALERT_TYPE_ICON_MAP = {
	[AlertType.Info]: faCircleInfo,
	[AlertType.Success]: faCircleCheck,
	[AlertType.Warning]: faTriangleExclamation,
	[AlertType.Error]: faCircleExclamation,
};

export function GhostAlert({
	className,
	type = AlertType.Info,
	text,
	show = true,
}: Props) {
	const classNameProps = getClassNameProps(
		'flex flex-row p-0 pl-1 bg-transparent border-none alert w-fit',
		ALERT_TYPE_STYLES_MAP[type], // Styles per alert type
		className,
	);
	const icon = ALERT_TYPE_ICON_MAP[type];

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					key={type}
					role="alert"
					{...FADE_IN_ANIMATION_PROPS}
					{...classNameProps}
				>
					<FontAwesomeIcon icon={icon} />
					<span>{text}</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
