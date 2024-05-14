/*
	Constants that are used throughout the application
	--------------------------------------------------
*/


// Constants

const FADE_TRANSITION_VARIANTS = {
	hidden: {
		opacity: 0,
		scale: .8,
	},
	show: {
		opacity: 1,
		scale: 1,
	}
} as const;

// Directories
export const PROJECTS_DIR = 'projects';
export const OG_IMAGE_DIR = 'og-image';

// ID used to group together elements for the title animation
export const TITLE_LAYOUT_ID = 'title-layout';

// Props for enabling a fade-in animation for a Framer Motion component
export const FADE_IN_ANIMATION_PROPS = {
	initial: FADE_TRANSITION_VARIANTS.hidden,
	animate: FADE_TRANSITION_VARIANTS.show,
	exit: FADE_TRANSITION_VARIANTS.hidden,
} as const;

// Props for setting a spring transition on a Framer Motion component
export const SPRING_TRANSITION_PROPS = {
	transition: {
		type: 'spring',
		stiffness: 220,
		damping: 20,
		restSpeed: .2,
		restDelta: .08,
	}
} as const;
