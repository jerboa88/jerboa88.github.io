/*
	Constants that are used throughout the application
	--------------------------------------------------
*/

// Constants

const FADE_TRANSITION_VARIANTS = {
	hidden: {
		opacity: 0,
		scale: 0.8,
	},
	show: {
		opacity: 1,
		scale: 1,
	},
} as const;

// Directories
export const PAGE_TEMPLATES_DIR = './src/templates/page' as const;
export const SOCIAL_IMAGE_TEMPLATES_DIR =
	'./src/templates/social-image' as const;
export const PROJECTS_DIR = '/projects' as const;
export const SOCIAL_IMAGES_DIR = '/__generatedSocialImages' as const;

// ID used to group together elements for the title animation
export const TITLE_LAYOUT_ID = 'title-layout' as const;

// Options for the useInView hook. Margin is used to offset the height of the navbar
export const USE_IN_VIEW_OPTIONS = {
	amount: 0,
	margin: '-68px',
} as const;

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
		restSpeed: 0.2,
		restDelta: 0.08,
	},
} as const;
