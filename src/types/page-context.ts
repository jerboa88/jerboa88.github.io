/**
 * Type definitions for page context objects
 */

import type { Project } from './content/projects.ts';
import type { ImageMetadataProp, PageMetadataProp } from './other.ts';
import type { EmptyObject } from './utils.ts';

/**
 * Base page context type that can be extended with additional properties. Page metadata is automatically added to pages of this type
 *
 * @typeParam T - Additional context properties
 */
type PageContext<T extends object = EmptyObject> = PageMetadataProp & T;

/**
 * Base page context type for social images pages that can be extended with additional properties. Image metadata is automatically added to pages of this type by {@link https://github.com/jerboa88/gatsby-plugin-component-to-image | gatsby-plugin-component-to-image}
 *
 * @typeParam T - Additional context properties
 */
type SocialImagePageContext<T extends object = EmptyObject> =
	ImageMetadataProp & T;

/**
 * Page context to add to the index page
 */
export type IndexPageContext = {
	projects: Project[];
	authorBio: string;
};

/**
 * Page context to add to project pages
 */
export type ProjectPageContext = {
	project: Project;
};

/**
 * Page context to add to the resume page
 */
export type ResumePageContext = PageContext<{
	projects: Project[];
}>;

/**
 * Page context for the cover letter page
 */
export type CoverLetterPageContext = PageContext;

/**
 * Page context for the funding page
 */
export type FundingPageContext = PageContext;

/**
 * Page context for the privacy policy page
 */
export type PrivacyPageContext = PageContext;

/**
 * Page context for the 404 page
 */
export type NotFoundPageContext = PageContext;

/**
 * Page context for the index social image page
 */
export type IndexSocialImagePageContext =
	SocialImagePageContext<IndexPageContext>;

/**
 * Page context for other social image pages
 */
export type OtherSocialImagePageContext =
	SocialImagePageContext<PageMetadataProp>;

/**
 * Page context for project social image pages
 */
export type ProjectSocialImagePageContext =
	SocialImagePageContext<ProjectPageContext>;
