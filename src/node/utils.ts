/**
 * Utility functions for use in Gatsby Node API functions
 */

import { createWriteStream } from 'node:fs';
import { mkdir as mkdirAsync } from 'node:fs/promises';
import { dirname, join, sep } from 'node:path';
import type { Actions, Page } from 'gatsby';
import { createImage } from 'gatsby-plugin-component-to-image';
import { INDEX_PATH, SOCIAL_IMAGES_PATH } from '../config/constants.ts';
import { getSocialImageGenerationConfigForType } from '../managers/config.ts';
import { SocialImageType } from '../types/other.ts';
import type { AbsolutePathString } from '../types/strings.ts';
import type { Maybe } from '../types/utils.ts';
import { assertIsDefined } from '../utils/other.ts';
import { removeTrailingSlash } from '../utils/urls.ts';
import { info, panic } from './logger.ts';

// Runtime variables

let gatsbyCreatePage: Maybe<Actions['createPage']>;
let gatsbyDeletePage: Maybe<Actions['deletePage']>;
let gatsbyCreateRedirect: Maybe<Actions['createRedirect']>;

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

/**
 * Recursively create directories for a given path
 *
 * @param path The path to create directories for. If the path ends with a slash, it will be treated as a directory. Otherwise, it will be treated as a file.
 * @returns A promise that resolves when the directories have been created
 * @example
 * await createDirs('/path/to/dir/file.txt'); // Creates /path/to/dir/
 * await createDirs('another/path/to/dir/'); // Creates /another/path/to/dir/
 */
export async function createDirs(path: string) {
	const dirName = path.endsWith(sep) ? path : dirname(path);

	await mkdirAsync(dirName, { recursive: true });
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
export async function createPage({
	path,
	component,
	socialImageComponent,
	context,
}: CreatePageOptions) {
	return new Promise((resolve) => {
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

		resolve(undefined);
	});
}

/** Delete a page

 * @param page The page to delete
 * @example
 * deletePage(page);
*/
export function deletePage(page: Page) {
	info(`Deleting page at ${page.path}`);

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
export async function createRedirect(fromPath: string, toPath: string) {
	return new Promise((resolve) => {
		info(`Creating redirect from ${fromPath} to ${toPath}`);

		assertIsDefined(
			gatsbyCreateRedirect,
			'Expected gatsbyCreateRedirect to be defined, but it was not',
		);

		gatsbyCreateRedirect({
			fromPath,
			toPath,
			isPermanent: true,
		});

		resolve(undefined);
	});
}

/**
 * Fetch an image from a URL and save it to a file
 *
 * @param imageUrl The URL of the image to fetch
 * @param outputPath The path to save the image to
 * @example
 * await fetchAndSaveImage('https://example.com/image.png', './public/image.png');
 */
export async function fetchAndSaveImage(
	imageUrl: string,
	outputPath: string,
): Promise<void> {
	info(`Saving image from ${imageUrl} to ${outputPath}`);

	try {
		const response = await fetch(imageUrl);

		if (!response.ok) {
			panic(
				`Failed to fetch image: ${response.status} - ${response.statusText}`,
			);
		}

		const arrayBuffer = response.arrayBuffer();
		const writeStream = createWriteStream(outputPath);

		writeStream.write(Buffer.from(await arrayBuffer));
		writeStream.end();
	} catch (error) {
		panic(`Error fetching and saving image: ${error}`);
	}
}
