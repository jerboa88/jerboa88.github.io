/*
	Helper functions and constants that are used throughout the application
	-----------------------------------------------------------------------
*/


import defaultProjectImage from '../images/default-tile-bg.png'


// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}


export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}


const fadeTransitionVariants = {
	hidden: {
		opacity: 0,
		scale: .8,
	},
	show: {
		opacity: 1,
		scale: 1,
	}
} as const;


// Props for enabling a fade-in animation for a Framer Motion component
export const withFadeInAnimation = {
	initial: fadeTransitionVariants.hidden,
	animate: fadeTransitionVariants.show,
	exit: fadeTransitionVariants.hidden,
} as const;


// Props for setting a spring transition on a Framer Motion component
export const withSpringTransition = {
	transition: {
		type: 'spring',
		stiffness: 220,
		damping: 20,
		restSpeed: .2,
		restDelta: .08,
	}
} as const;


// Props for setting an interactive card animation on a Framer Motion component
export const asInteractiveCard = {
	whileHover: {
		scale: 1.05,
	},
	whileTap: {
		scale: .95,
	},
} as const;
