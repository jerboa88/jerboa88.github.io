/**
 * Utility functions for working with URLs
 */

import { getSiteMetadata } from '../managers/config.ts';
import type { UrlString } from '../types/strings.ts';
import { getOrDefault } from './other.ts';

// Constants

const SITE_METADATA = getSiteMetadata();
const MIME_TYPE_MAP = {
	apng: 'image/apng',
	avif: 'image/avif',
	gif: 'image/gif',
	jpeg: 'image/jpeg',
	jpg: 'image/jpeg',
	png: 'image/png',
	svg: 'image/svg+xml',
	webp: 'image/webp',
} as const;

// Functions

/**
 * Returns the absolute URL for the given path.
 *
 * @remarks
 *
 * If a base URL is provided, the path is resolved relative to the base URL.
 * If no base URL is provided, the path is resolved relative to the `SITE_METADATA.siteUrl`.
 *
 * @param path - The path to be resolved.
 * @param base - The base URL to resolve the path against. Optional.
 * @returns The absolute URL.
 * @example
 * getAbsoluteUrl('/about') // https://example.com/about
 */
export function getAbsoluteUrl(path: string, base?: string) {
	return new URL(path, base ?? SITE_METADATA.siteUrl);
}

/**
 * Retrieves the MIME type of a file based on its URL.
 * @param fileUrl - The URL of the file.
 * @returns The MIME type of the file.
 * @throws Error if a file extension is not found in the URL.
 * @example
 * getMimeType(new URL('https://example.com/image.jpg')) // 'image/jpeg'
 */
export function getMimeType(fileUrl: URL) {
	const extension = fileUrl.pathname.split('.').pop();

	if (extension === undefined) {
		throw new Error('File extension not found in URL');
	}

	return getOrDefault(MIME_TYPE_MAP, extension) as string;
}

/**
 * Removes the trailing slash from a given path.
 *
 * @param path - The path to remove the trailing slash from.
 * @returns The path without the trailing slash.
 * @example
 * removeTrailingSlash('/about/') // '/about'
 */
export function removeTrailingSlash(path: string) {
	return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Removes the protocol from a URL string or URL object.
 * @param url - The URL string or URL object.
 * @returns The URL string without the protocol.
 * @example
 * removeProtocol('https://example.com') // 'example.com'
 */
export function removeProtocol(url: UrlString | URL) {
	const urlString = url instanceof URL ? url.toString() : url;

	return urlString.replace(/.*?:\/\//g, '');
}
