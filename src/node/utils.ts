/**
 * Utility functions for use in Gatsby Node API functions
 */

import { join } from 'node:path';
import type { Actions, Page } from 'gatsby';
import { createImage } from 'gatsby-plugin-component-to-image';
import { INDEX_PATH, SOCIAL_IMAGES_PATH } from '../config/constants.ts';
import { getSocialImageGenerationConfigForType } from '../managers/config.ts';
import { SocialImageType } from '../types/other.ts';
import type { AbsolutePathString } from '../types/strings.ts';
import { assertIsDefined } from '../utils/other.ts';
import { removeTrailingSlash } from '../utils/urls.ts';
import { info } from './logger.ts';

// Runtime variables

let gatsbyCreatePage: Actions['createPage'] | undefined;
let gatsbyDeletePage: Actions['deletePage'] | undefined;
let gatsbyCreateRedirect: Actions['createRedirect'] | undefined;

// Types

interface CreatePageOptions {
	path: AbsolutePathString;
	component: string;
	socialImageComponent: string;
	context: object;
}

interface CreateSocialImagesOptions {
	path: string;
	component: string;
	context: object;
}

// Functions

/** Set Gatsby Node API Helpers for later use
 *
 * @param createPage The Gatsby `createPage` function
 * @param deletePage The Gatsby `deletePage` function
 * @param createRedirect The Gatsby `createRedirect` function
 * @example
 * setGatsbyNodeHelpers(createPage, deletePage, createRedirect);
 */
export function setGatsbyNodeHelpers(
	createPage: Actions['createPage'],
	deletePage: Actions['deletePage'],
	createRedirect: Actions['createRedirect'],
) {
	gatsbyCreatePage = createPage;
	gatsbyDeletePage = deletePage;
	gatsbyCreateRedirect = createRedirect;
}

/** Generate a single social image for a page
 *
 * @param type The type of social image to generate
 * @param options The options to use when generating the social image
 * @returns The metadata for the generated social image
 */
function createSocialImage(
	type: SocialImageType,
	{ path, component, context }: CreateSocialImagesOptions,
) {
	const pagePath = join(SOCIAL_IMAGES_PATH, type, path);
	const imageFileName =
		path === INDEX_PATH ? 'index' : removeTrailingSlash(path);
	const imagePath = join('/', 'images', type, `${imageFileName}.webp`);
	const { size } = getSocialImageGenerationConfigForType(type);
	const socialImageMetadata = createImage({
		pagePath,
		imagePath,
		component,
		size,
		context,
	});

	return socialImageMetadata;
}

/** Generate a set of social images for a page
 *
 * @param options The options to use when generating the social images
 */
function createSocialImages(options: CreateSocialImagesOptions) {
	return {
		[SocialImageType.OpenGraph]: createSocialImage(
			SocialImageType.OpenGraph,
			options,
		),
		[SocialImageType.X]: createSocialImage(SocialImageType.X, options),
	};
}

/** Create a page and generate the associated social images for it
 *
 * @param path The path of the page
 * @param component The component to use for the page
 * @param socialImageComponent The component to use for the social images
 * @param context The context to pass to the page
 */
export function createPage({
	path,
	component,
	socialImageComponent,
	context,
}: CreatePageOptions) {
	info(`Creating page at ${path}`);

	assertIsDefined(
		gatsbyCreatePage,
		'Expected gatsbyCreatePage to be defined, but it was not',
	);

	const socialImagesMetadata = createSocialImages({
		path: path,
		component: socialImageComponent,
		context: context,
	});

	gatsbyCreatePage({
		path: path,
		component: component,
		context: {
			...context,
			socialImagesMetadata: socialImagesMetadata,
		},
	});
}

/** Delete a page

 * @param page The page to delete
 * @example
 * deletePage(page);
*/
export function deletePage(page: Page) {
	assertIsDefined(
		gatsbyDeletePage,
		'Expected gatsbyDeletePage to be defined, but it was not',
	);

	gatsbyDeletePage(page);
}

/** Create a client-side redirect
 *
 * @param fromPath The path to redirect from
 * @param toPath The path to redirect to
 * @example
 * createRedirect('/old-path', '/new-path');
 */
export function createRedirect(fromPath: string, toPath: string) {
	assertIsDefined(
		gatsbyCreateRedirect,
		'Expected gatsbyCreateRedirect to be defined, but it was not',
	);

	gatsbyCreateRedirect({
		fromPath: fromPath,
		toPath: toPath,
		isPermanent: true,
	});
}
