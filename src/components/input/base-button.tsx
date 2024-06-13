/*
	A template for a responsive button with optional text/icon.
	This should not be used directly, but rather as a base for other button components.
	-----------------------------------------------------------------------------------
*/

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonInterface } from '../../common/types';
import { FADE_IN_ANIMATION_PROPS } from '../../common/constants';
import { getClassNameProps } from '../../common/utilities';
import Tooltip from '../tooltip';

export default function BaseButton({
	className,
	iconClassName,
	textClassName,
	tooltipClassName,
	type = 'button',
	icon,
	text,
	tooltipText,
	tooltipPosition,
	disabled = false,
	responsive = false,
	flip = false,
	layout,
	layoutRoot,
}: ButtonInterface) {
	const buttonClassNameProps = getClassNameProps(
		'flex flex-row justify-center items-center self-center gap-2 z-20 text-sm font-button uppercase',
		flip && 'flex-row-reverse', // Button flip styles
		className,
	);
	const iconClassNameProps = getClassNameProps(
		'fa-fw',
		!text && 'text-xl', // Icon-only styles
		iconClassName,
	);
	const textClassNameProps = getClassNameProps(
		responsive && icon && 'max-lg:hidden', // Responsive styles
		textClassName,
	);

	const buttonElement = (
		<motion.button
			{...{ type, disabled, layout, layoutRoot, ...buttonClassNameProps }}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{icon && (
					<motion.span
						key="icon"
						layout="position"
						{...FADE_IN_ANIMATION_PROPS}
					>
						<FontAwesomeIcon icon={icon} {...iconClassNameProps} />
					</motion.span>
				)}
				{text && (
					<motion.span
						key="text"
						layout="position"
						{...FADE_IN_ANIMATION_PROPS}
						{...textClassNameProps}
					>
						{text}
					</motion.span>
				)}
			</AnimatePresence>
		</motion.button>
	);

	const computedTooltipText = tooltipText ?? text;

	return computedTooltipText ? (
		<Tooltip
			text={computedTooltipText}
			position={tooltipPosition}
			className={tooltipClassName}
		>
			{buttonElement}
		</Tooltip>
	) : (
		buttonElement
	);
}
