/*
	Reusable card component
	-----------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../common/types';
import { AnimationProps, motion, useMotionTemplate, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { withSpringTransition } from '../common/utilities';


// Types

interface CardPropsInterface extends PropsWithClassName, PropsWithChildren {
	disabled?: boolean;
}


// Constants

const MOUSE_XY_COORDS_DEFAULT = 0;
const MOUSE_XY_COORDS_MIN = -1;
const MOUSE_XY_COORDS_MAX = 1;
const MOUSE_Z_COORDS_DEFAULT = 1;
const MOUSE_Z_COORDS_MIN = .98;
const MOUSE_Z_COORDS_MAX = 1.02;
const MOTION_VALUE_TRANSITION = {
	...withSpringTransition.transition,
	damping: 120,
};
const HOVER_PROPS = {
	initial: { scale: MOUSE_Z_COORDS_DEFAULT },
	whileHover: { scale: MOUSE_Z_COORDS_MAX },
	whileTap: { scale: MOUSE_Z_COORDS_MIN },
	transition: getTransitionWithoutRestProps(withSpringTransition.transition),
};

// Remove the restDelta and restSpeed properties from a Framer Motion transition object
function getTransitionWithoutRestProps(transition: AnimationProps['transition']) {
	const { restDelta, restSpeed, ...transitionWithoutRestProps } = transition;

	return transitionWithoutRestProps;
};

// Clamp a value between a minimum and maximum value
function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
};

// Given a mouse event, return the normalized coordinates of the mouse within the card
function getMouseCoords(event: React.MouseEvent<HTMLDivElement>) {
	const cardBoundingBox = event.currentTarget.getBoundingClientRect();

	return {
		x: 2 * MOUSE_XY_COORDS_MAX * (event.clientX - cardBoundingBox.left) / cardBoundingBox.width - MOUSE_XY_COORDS_MAX,
		y: 2 * MOUSE_XY_COORDS_MAX * (event.clientY - cardBoundingBox.top) / cardBoundingBox.height - MOUSE_XY_COORDS_MAX,
	}
};

// Given the mouse position relative to an element, return the scale of the background gradient
function getBackgroundScale(xCoords: number, zCoords: number) {
	const scaleModifier = Math.abs(zCoords);
	const skewModifier = 1 + Math.abs(xCoords) / 4;

	return 175 * scaleModifier * skewModifier;
}


export default function Card({ className = '', disabled = false, children }: CardPropsInterface) {
	const shouldReduceMotion = useReducedMotion();

	// Motion values that track the mouse position within the card
	// The values are normalized to be between -1 and 1, with (0, 0) being the center of the card
	const mouseXCoords = useSpring(MOUSE_XY_COORDS_DEFAULT, MOTION_VALUE_TRANSITION);
	const mouseYCoords = useSpring(MOUSE_XY_COORDS_DEFAULT, MOTION_VALUE_TRANSITION);
	const mouseZCoords = useSpring(MOUSE_Z_COORDS_DEFAULT, MOTION_VALUE_TRANSITION);

	// Calculate the background gradient origin based on the mouse position
	const bgOriginXPercentage = useTransform(mouseXCoords, [MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX], [0, 100]);
	const bgOriginYPercentage = useTransform(mouseYCoords, [MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX], [-25, 75]);

	// Calculate the background gradient scale based on the mouse position
	const bgXScale = useTransform(mouseXCoords, value => getBackgroundScale(value, mouseZCoords.get()));
	const bgYScale = useTransform(mouseYCoords, value => getBackgroundScale(value, mouseZCoords.get()));


	// Calculate the card rotation based on the mouse position
	// The mouse position is first clamped to prevent extreme rotation values, then we calculate the tangent
	const cardXRotationDegrees = useTransform(mouseYCoords, value => Math.tan(clamp(value, MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX)));
	const cardYRotationDegrees = useTransform(mouseXCoords, value => Math.tan(-clamp(value, MOUSE_XY_COORDS_MIN, MOUSE_XY_COORDS_MAX)));

	// Generate the background gradient string based on the mouse position
	const backgroundGradientString = useMotionTemplate`radial-gradient(${bgXScale}% ${bgYScale}% at ${bgOriginXPercentage}% ${bgOriginYPercentage}%,rgba(255,255,255,.5) 0%,transparent 100%),oklch(var(--b2))`; 500


	// Update the mouse position when the mouse moves within the card
	const handleMouseMove = disabled || shouldReduceMotion ? undefined : (event: React.MouseEvent<HTMLDivElement>) => {
		const { x, y } = getMouseCoords(event);

		mouseXCoords.set(x);
		mouseYCoords.set(y);
	};


	// Set the mouse Z position to the max value when the mouse enters the card
	function handleMouseEnter() {
		mouseZCoords.set(MOUSE_Z_COORDS_MAX);
	}


	// Reset the card position when the mouse leaves the card
	function handleMouseLeave() {
		mouseXCoords.set(MOUSE_XY_COORDS_DEFAULT);
		mouseYCoords.set(MOUSE_XY_COORDS_DEFAULT);
	};


	// Set the mouse Z position to the min value when the mouse is pressed down
	function handleMouseDown() {
		mouseZCoords.set(MOUSE_Z_COORDS_MIN);
	}


	return (
		<div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseDown={handleMouseDown} style={{ perspective: 500 }} className={className}>
			<motion.div
				style={{ transformOrigin: 'center', background: backgroundGradientString, rotateX: cardXRotationDegrees, rotateY: cardYRotationDegrees }}
				{...(disabled || shouldReduceMotion ? {} : HOVER_PROPS)}
				className="overflow-hidden w-full h-full shadow-md bg-base-200 !bg-clip-content rounded-[1.1rem]">
				<div className="w-full h-full rounded-2xl border-2 mix-blend-overlay bg-base-200 border-base-content/5">
					{children}
				</div>
			</motion.div>
		</div>
	);
}
