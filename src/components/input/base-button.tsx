/*
	A template for a responsive button with optional text/icon.
	This should not be used directly, but rather as a base for other button components.
	-----------------------------------------------------------------------------------
*/


import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonInterface } from '../../common/types';
import { asInteractiveCard, withFadeInAnimation } from '../../common/utilities';


export default function BaseButton({ className = '', type = 'button', iconClassName = '', textClassName = '', disabled = false, responsive = false, flip = false, icon, text, layout, layoutRoot }: ButtonInterface) {
	const buttonFlipStyles = flip ? 'flex-row-reverse' : '';
	const buttonStyles = `flex flex-row justify-center items-center self-center gap-2 z-20 text-sm font-button uppercase ${buttonFlipStyles} ${className}`;

	const iconOnlyStyles = text ? '' : 'text-xl';
	const iconStyles = `fa-fw ${iconOnlyStyles} ${iconClassName}`;

	const textResponsiveStyles = (responsive && icon) ? 'max-lg:hidden' : '';
	const textStyles = `${textResponsiveStyles} ${textClassName} `;

	const interactiveCardProps = disabled ? {} : asInteractiveCard;

	return (
		<motion.button {...{ type, disabled, layout, layoutRoot }} {...interactiveCardProps} className={buttonStyles}>
			<AnimatePresence mode="popLayout">
				{icon && (
					<motion.span key="icon" layout="position" {...withFadeInAnimation}>
						<FontAwesomeIcon icon={icon} className={iconStyles} />
					</motion.span>
				)}
				{text && (
					<motion.span key="text" layout="position" {...withFadeInAnimation} className={textStyles}>
						{text}
					</motion.span>
				)}
			</AnimatePresence>
		</motion.button>
	);
}
