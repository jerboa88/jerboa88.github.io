import type { UrlString } from '../../types/strings';
import { MIME_TYPE_MAP, SITE_METADATA, getOrDefault } from './other';

// Given a path, return the absolute URL
export function getAbsoluteUrl(path: string, base?: string) {
	return new URL(path, base ?? SITE_METADATA.siteUrl);
}

// Get the MIME type of a file URL based on its extension
export function getMimeType(fileUrl: URL) {
	const extension = fileUrl.pathname.split('.').pop();

	if (extension === undefined) {
		throw new Error('File extension not found in URL');
	}

	return getOrDefault(MIME_TYPE_MAP, extension) as string;
}

// Remove a trailing slash from a path if it exists
export function removeTrailingSlash(path: string) {
	return path.endsWith('/') ? path.slice(0, -1) : path;
}

// Remove the protocol from a URL
export function removeProtocol(url: UrlString | URL) {
	const urlString = url instanceof URL ? url.toString() : url;

	return urlString.replace(/.*?:\/\//g, '');
}
