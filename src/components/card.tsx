/*
	Reusable card component
	-----------------------
*/


import React, { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../common/types';
import { AnimationProps, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { withSpringTransition } from '../common/utilities';


// Types

interface CardPropsInterface extends PropsWithClassName, PropsWithChildren {
	disabled?: boolean;
}


// Constants

const DEFAULT_MOUSE_X_COORDS = 0;
const DEFAULT_MOUSE_Y_COORDS = 0;
const MOTION_VALUE_TRANSITION = {
	...withSpringTransition.transition,
	damping: 120,
};
const HOVER_PROPS = {
	initial: { scale: 1 },
	whileHover: { scale: 1.02 },
	whileTap: { scale: .98 },
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
		x: 2 * (event.clientX - cardBoundingBox.left) / cardBoundingBox.width - 1,
		y: 2 * (event.clientY - cardBoundingBox.top) / cardBoundingBox.height - 1,
	}
};


export default function Card({ className = '', disabled = false, children }: CardPropsInterface) {
	const shouldReduceMotion = useReducedMotion();

	// Motion values that track the mouse position within the card
	// The values are normalized to be between -1 and 1, with (0, 0) being the center of the card
	const mouseXCoords = useSpring(DEFAULT_MOUSE_X_COORDS, MOTION_VALUE_TRANSITION);
	const mouseYCoords = useSpring(DEFAULT_MOUSE_Y_COORDS, MOTION_VALUE_TRANSITION);

	// Calculate the background gradient origin based on the mouse position
	const bgOriginXPercentage = useTransform(mouseXCoords, [-1, 1], [0, 100]);
	const bgOriginYPercentage = useTransform(mouseYCoords, [-1, 1], [-25, 75]);

	// Calculate the card rotation based on the mouse position
	// The mouse position is first clamped to prevent extreme rotation values, then we calculate the tangent
	const cardXRotationDegrees = useTransform(mouseYCoords, value => Math.tan(clamp(value, -1, 1)));
	const cardYRotationDegrees = useTransform(mouseXCoords, value => Math.tan(-clamp(value, -1, 1)));

	// Generate the background gradient string based on the mouse position
	const backgroundGradientString = useMotionTemplate`radial-gradient(175% 175% at ${bgOriginXPercentage}% ${bgOriginYPercentage}%,rgba(255,255,255,.5) 0%,transparent 100%),oklch(var(--b2))`;


	// Update the mouse position when the mouse moves within the card
	const handleMouseMove = disabled || shouldReduceMotion ? undefined : (event: React.MouseEvent<HTMLDivElement>) => {
		const { x, y } = getMouseCoords(event);

		mouseXCoords.set(x);
		mouseYCoords.set(y);
	};


	// Reset the card position when the mouse leaves the card
	function handleMouseLeave() {
		mouseXCoords.set(DEFAULT_MOUSE_X_COORDS);
		mouseYCoords.set(DEFAULT_MOUSE_Y_COORDS);
	};

	return (
		<div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 500 }} className={className}>
			<motion.div
				style={{ transformOrigin: 'center', background: backgroundGradientString, rotateX: cardXRotationDegrees, rotateY: cardYRotationDegrees }}
				{...(disabled || shouldReduceMotion ? {} : HOVER_PROPS)}
				className="overflow-hidden w-full h-full shadow-md bg-base-200 !bg-clip-content rounded-[1.1rem]">
				<div className="w-full h-full rounded-2xl border-2 mix-blend-hard-light bg-base-200 border-base-content/5">
					{children}
				</div>
			</motion.div>
		</div>
	);
}
