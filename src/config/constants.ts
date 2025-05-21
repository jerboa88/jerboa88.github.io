/*
	Constants that are used throughout the application
	--------------------------------------------------
*/

import { z } from 'zod';
import {
	ProjectCategory,
	SchemaApplicationCategory,
	SchemaType,
} from '../types/content/projects.ts';
import type {
	AbsolutePathString,
	FilePathString,
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

// Directory/file paths
export const PAGE_TEMPLATES_DIR: WorkingPathString = './src/templates/page';
export const SOCIAL_IMAGE_TEMPLATES_DIR: WorkingPathString =
	'./src/templates/social-image';
export const PROJECT_METADATA_SCHEMA_FILE: WorkingPathString & FilePathString =
	'./public/schema/project-metadata.json';

// Page paths
export const INDEX_PATH: AbsolutePathString = '/';
export const ABOUT_PATH: AbsolutePathString = '/about';
export const EXPERIENCE_PATH: AbsolutePathString = '/experience';
export const PROJECTS_PATH: AbsolutePathString = '/projects';
export const PROJECTS_PATH_SHORT: AbsolutePathString = '/p';
export const CONTACT_PATH: AbsolutePathString = '/contact';
export const RESUME_PATH: AbsolutePathString = '/resume';
export const COVER_LETTER_PATH: AbsolutePathString = '/cover-letter';
export const FUNDING_PATH: AbsolutePathString = '/funding';
export const PRIVACY_POLICY_PATH: AbsolutePathString = '/privacy-policy';
export const NOT_FOUND_PATH: AbsolutePathString = '/404';
export const SOCIAL_IMAGES_PATH: AbsolutePathString =
	'/__generatedSocialImages';
export const AUTHOR_SCHEMA_PATH: AbsolutePathString & FilePathString =
	'/schema/author.json';

// GitHub repo paths (relative to the repo root)
// These are relative to the repo root. Paths cannot start with a dot or slash
export const PROJECT_METADATA_PATH: FilePathString = 'project-metadata.json';
export const PROJECT_README_PATH: FilePathString = 'README.md';

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

// Props for enabling a fade-in animation for a Motion component
export const FADE_IN_ANIMATION_PROPS = {
	initial: FADE_TRANSITION_VARIANTS.hidden,
	animate: FADE_TRANSITION_VARIANTS.show,
	exit: FADE_TRANSITION_VARIANTS.hidden,
} as const;

// Props for setting a spring transition on a Motion component
export const SPRING_TRANSITION_PROPS = {
	transition: {
		type: 'spring',
		stiffness: 220,
		damping: 20,
		restSpeed: 0.2,
		restDelta: 0.08,
	},
} as const;

export const SENTENCE_REGEX = /[\.!?…]$/;

export const PROJECT_METADATA_SCHEMA = z
	.object({
		name: z
			.string()
			.min(1)
			.max(128)
			.describe('A human-readable name for the project'),
		background: z
			.string()
			.min(1)
			.max(1024)
			.regex(
				SENTENCE_REGEX,
				'Invalid sentence. Expected the string to end with a period, comma, exclamation mark, or ellipsis',
			)
			.optional()
			.describe(
				"A detailed description of the project for use on resumes. This may include the project's purpose, the motivation behind it, team members, and technologies used",
			),
		logoPath: z
			.string()
			.min(1)
			.max(128)
			.optional()
			.describe("A path to the project's logo"),
		category: z
			.nativeEnum(ProjectCategory)
			.describe('The general type of the project'),
		languages: z
			.array(z.string().min(1).max(128))
			.nonempty()
			.optional()
			.describe('A list of languages used in the project')
			.transform((value) => value ?? []),
		technologies: z
			.array(z.string().min(1).max(128))
			.nonempty()
			.optional()
			.describe('A list of technologies used in the project')
			.transform((value) => value ?? []),
		tools: z
			.array(z.string().min(1).max(128))
			.nonempty()
			.optional()
			.describe('A list of tools used in the project')
			.transform((value) => value ?? []),
		topics: z
			.array(z.string().min(1).max(128))
			.nonempty()
			.optional()
			.describe('A list of topics for the project')
			.transform((value) => value ?? []),
		schema: z
			.object({
				type: z
					.nativeEnum(SchemaType)
					.describe(
						'The type of software application that the project is, as defined by Google',
					),
				applicationCategory: z
					.nativeEnum(SchemaApplicationCategory)
					.describe(
						'The category of the software application that the project belongs to, as defined by Google',
					),
				operatingSystem: z
					.string()
					.min(1)
					.describe(
						'The operating system(s) that the project is compatible with, as defined by Google',
					),
			})
			.strict()
			.partial()
			.optional()
			.describe(
				'Passthrough schema.org properties used to construct structured data for the project',
			)
			.transform((value) => value ?? {}),
	})
	.describe('Metadata for a project');
