/*
	Reusable card component
	-----------------------
*/

import {
	type AnimationProps,
	type Spring,
	motion,
	useMotionTemplate,
	useReducedMotion,
	useSpring,
	useTransform,
} from 'motion/react';
import type { PropsWithChildren } from 'react';
import { SPRING_TRANSITION_PROPS } from '../config/constants.ts';
import type { Maybe } from '../types/utils.ts';
import { clamp } from '../utils/numbers.ts';
import { doesDeviceSupportHover, getClassNameProps } from '../utils/other.ts';

// Types

interface Props extends PropsWithChildren {
	outerClassName?: string;
	middleClassName?: string;
	innerClassName?: string;
	disabled?: boolean;
}

// Constants

const MOUSE_XY_COORDS_DEFAULT = 0;
const MOUSE_XY_COORDS_MIN = -1;
const MOUSE_XY_COORDS_MAX = 1;
const MOUSE_Z_COORDS_DEFAULT = 1;
const MOUSE_Z_COORDS_MIN = 0.98;
const MOUSE_Z_COORDS_MAX = 1.02;
const MOTION_VALUE_TRANSITION = {
	...SPRING_TRANSITION_PROPS.transition,
	damping: 120,
};
const HOVER_PROPS = {
	initial: { scale: MOUSE_Z_COORDS_DEFAULT },
	whileHover: { scale: MOUSE_Z_COORDS_MAX },
	whileTap: { scale: MOUSE_Z_COORDS_MIN },
	transition: getTransitionWithoutRestProps(SPRING_TRANSITION_PROPS.transition),
};

// Remove the restDelta and restSpeed properties from a Motion transition object
function getTransitionWithoutRestProps(
	transition: Spring,
): AnimationProps['transition'] {
	const { restDelta, restSpeed, ...transitionWithoutRestProps } = transition;

	return transitionWithoutRestProps;
}

// Given a mouse event, return the normalized coordinates of the mouse within the card
function getMouseCoords(event: React.MouseEvent<HTMLDivElement>) {
	const cardBoundingBox = event.currentTarget.getBoundingClientRect();

	return {
		x:
			(2 * MOUSE_XY_COORDS_MAX * (event.clientX - cardBoundingBox.left)) /
				cardBoundingBox.width -
			MOUSE_XY_COORDS_MAX,
		y:
			(2 * MOUSE_XY_COORDS_MAX * (event.clientY - cardBoundingBox.top)) /
				cardBoundingBox.height -
			MOUSE_XY_COORDS_MAX,
	};
}

// Given the mouse position relative to an element, return the scale of the background gradient
function getBackgroundScale(xCoords: number, zCoords: number) {
	const scaleModifier = Math.abs(zCoords);
	const skewModifier = 1 + Math.abs(xCoords) / 4;

	return 100 * scaleModifier * skewModifier;
}

export function Card({
	outerClassName,
	middleClassName,
	innerClassName,
	disabled = false,
	children,
}: Props) {
	// Hooks

	const shouldReduceMotion = useReducedMotion();

	// Motion values that track the mouse position within the card
	// The values are normalized to be between -1 and 1, with (0, 0) being the center of the card
	const mouseXCoords = useSpring(
		MOUSE_XY_COORDS_DEFAULT,
		MOTION_VALUE_TRANSITION,
	);
	const mouseYCoords = useSpring(
		MOUSE_XY_COORDS_DEFAULT,
		MOTION_VALUE_TRANSITION,
	);
	const mouseZCoords = useSpring(
		MOUSE_Z_COORDS_DEFAULT,
		MOTION_VALUE_TRANSITION,
	);

	// Calculate the background gradient origin based on the mouse position
	const bgOriginXPercent = useTransform(
		mouseXCoords,
		[MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX],
		[0, 100],
	);
	const bgOriginYPercent = useTransform(
		mouseYCoords,
		[MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX],
		[-25, 75],
	);

	// Calculate the background gradient scale based on the mouse position
	const bgXScale = useTransform(mouseXCoords, (value) =>
		getBackgroundScale(value, mouseZCoords.get()),
	);
	const bgYScale = useTransform(mouseYCoords, (value) =>
		getBackgroundScale(value, mouseZCoords.get()),
	);

	// Calculate the card rotation based on the mouse position
	// The mouse position is first clamped to prevent extreme rotation values, then we calculate the tangent
	const xRotationDegs = useTransform(mouseYCoords, (value) =>
		Math.tan(clamp(value, MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX)),
	);
	const yRotationDegs = useTransform(mouseXCoords, (value) =>
		Math.tan(-clamp(value, MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX)),
	);

	// Generate the background gradient string based on the mouse position
	const bgGradientString = useMotionTemplate`radial-gradient(${bgXScale}% ${bgYScale}% at ${bgOriginXPercent}% ${bgOriginYPercent}%,oklch(var(--n)/.03),oklch(var(--b3)/.03))`;

	// Event handlers

	let handleMouseMove: Maybe<(event: React.MouseEvent<HTMLDivElement>) => void>;
	let handleMouseEnter: Maybe<
		(event: React.MouseEvent<HTMLDivElement>) => void
	>;
	let handleMouseLeave: Maybe<
		(event: React.MouseEvent<HTMLDivElement>) => void
	>;

	// Set the mouse Z position to the min value when the mouse is pressed down
	const handleMouseDown = () => {
		mouseZCoords.set(MOUSE_Z_COORDS_MIN);
	};

	if (!(disabled || shouldReduceMotion) && doesDeviceSupportHover()) {
		// Update the mouse position when the mouse moves within the card
		handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
			const { x, y } = getMouseCoords(event);

			mouseXCoords.set(x);
			mouseYCoords.set(y);
		};

		// Set the mouse Z position to the max value when the mouse enters the card
		handleMouseEnter = () => mouseZCoords.set(MOUSE_Z_COORDS_MAX);

		// Reset the card position when the mouse leaves the card
		handleMouseLeave = () => {
			mouseXCoords.set(MOUSE_XY_COORDS_DEFAULT);
			mouseYCoords.set(MOUSE_XY_COORDS_DEFAULT);
		};
	}

	// Vars

	const outerEventHandlerProps = {
		onMouseMove: handleMouseMove,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		onMouseDown: handleMouseDown,
	};
	const outerClassNameProps = getClassNameProps(outerClassName);
	const middleClassNameProps = getClassNameProps(
		'size-full shadow-md !bg-clip-content rounded-2xl backdrop-blur-sm',
		middleClassName,
	);
	const middleStyleProps = {
		style: {
			transformOrigin: 'center',
			background: bgGradientString,
			rotateX: xRotationDegs,
			rotateY: yRotationDegs,
		},
	};
	const middleHoverProps = disabled || shouldReduceMotion ? {} : HOVER_PROPS;
	const innerClassNameProps = getClassNameProps(
		'rounded-2xl border-2 mix-blend-overlay size-full border-base-content/5',
		innerClassName,
	);

	return (
		<div
			style={{ perspective: 500 }}
			{...outerClassNameProps}
			{...outerEventHandlerProps}
		>
			<motion.div
				{...{
					...middleStyleProps,
					...middleHoverProps,
					...middleClassNameProps,
				}}
				tabIndex={-1}
			>
				<div {...innerClassNameProps}>{children}</div>
			</motion.div>
		</div>
	);
}
