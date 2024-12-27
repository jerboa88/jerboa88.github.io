/*
	A template for a responsive button with optional text/icon.
	This should not be used directly, but rather as a base for other button components.
	-----------------------------------------------------------------------------------
*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { FADE_IN_ANIMATION_PROPS } from '../../config/constants.ts';
import type { Button } from '../../types/components.ts';
import { getClassNameProps, isDefined } from '../../utils/other.ts';
import { Tooltip } from '../tooltip.tsx';

export function BaseButton({
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
}: Button) {
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
	const tooltipClassNameProps = getClassNameProps(tooltipClassName);
	const layoutProp = isDefined(layout) ? { layout } : {};
	const layoutRootProp = isDefined(layoutRoot) ? { layoutRoot } : {};
	const tooltipPositionProp = isDefined(tooltipPosition)
		? { position: tooltipPosition }
		: {};

	const computedButtonLabel = tooltipText ?? String(text);

	const buttonElement = (
		<motion.button
			aria-label={computedButtonLabel}
			{...{
				type,
				disabled,
				...layoutProp,
				...layoutRootProp,
				...buttonClassNameProps,
			}}
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

	return !disabled && computedButtonLabel ? (
		<Tooltip
			text={computedButtonLabel}
			{...tooltipPositionProp}
			{...tooltipClassNameProps}
		>
			{buttonElement}
		</Tooltip>
	) : (
		buttonElement
	);
}
