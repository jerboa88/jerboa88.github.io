/*
	Constants that are used throughout the application
	--------------------------------------------------
*/

import type {
	AbsolutePathString,
	UrlString,
	WorkingPathString,
} from '../types/strings.ts';

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
export const PAGE_TEMPLATES_DIR: WorkingPathString = './src/templates/page';
export const SOCIAL_IMAGE_TEMPLATES_DIR: WorkingPathString =
	'./src/templates/social-image';

// Paths
export const INDEX_PATH: AbsolutePathString = '/';
export const ABOUT_PATH: AbsolutePathString = '/about';
export const EXPERIENCE_PATH: AbsolutePathString = '/experience';
export const PROJECTS_PATH: AbsolutePathString = '/projects';
export const PROJECTS_PATH_SHORT: AbsolutePathString = '/p';
export const CONTACT_PATH: AbsolutePathString = '/contact';
export const RESUME_PATH: AbsolutePathString = '/resume';
export const COVER_LETTER_PATH: AbsolutePathString = '/cover-letter';
export const PRIVACY_POLICY_PATH: AbsolutePathString = '/privacy-policy';
export const NOT_FOUND_PATH: AbsolutePathString = '/404';
export const SOCIAL_IMAGES_PATH: AbsolutePathString =
	'/__generatedSocialImages';
export const JSON_LD_AUTHOR_PATH: AbsolutePathString = '/author';

// ID used to group together elements for the title animation
export const TITLE_LAYOUT_ID = 'title-layout' as const;

export const BOTPOISON_PUBLIC_KEY =
	'pk_eca5c4ea-ccb4-46da-beb0-15c581b6980e' as const;
export const CONTACT_FORM_POST_URL: UrlString =
	'https://submit-form.com/re6Xbd2gs' as const;

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
