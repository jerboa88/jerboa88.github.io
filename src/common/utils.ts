/*
	Helper functions that are used throughout the application
	---------------------------------------------------------
*/

import { panic } from '../node/logger';
import { getSiteMetadata } from './config-manager';
import type { PropsWithClassName, SentenceString, UrlString } from './types';

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

// Status code information is adapted from https://github.com/prettymuchbryce/http-status-codes/blob/master/codes.json as is licensed under the MIT License
const STATUS_CODE_MESSAGE_MAP = {
	100: 'Continue',
	101: 'Switching Protocols',
	102: 'Processing',
	103: 'Early Hints',
	200: 'OK',
	201: 'Created',
	202: 'Accepted',
	203: 'Non Authoritative Information',
	204: 'No Content',
	205: 'Reset Content',
	206: 'Partial Content',
	207: 'Multi-Status',
	300: 'Multiple Choices',
	301: 'Moved Permanently',
	302: 'Moved Temporarily',
	303: 'See Other',
	304: 'Not Modified',
	307: 'Temporary Redirect',
	308: 'Permanent Redirect',
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	407: 'Proxy Authentication Required',
	408: 'Request Timeout',
	409: 'Conflict',
	410: 'Gone',
	411: 'Length Required',
	412: 'Precondition Failed',
	413: 'Request Entity Too Large',
	414: 'Request-URI Too Long',
	415: 'Unsupported Media Type',
	416: 'Requested Range Not Satisfiable',
	417: 'Expectation Failed',
	418: "I'm a teapot",
	419: 'Insufficient Space on Resource',
	421: 'Misdirected Request',
	422: 'Unprocessable Entity',
	423: 'Locked',
	424: 'Failed Dependency',
	426: 'Upgrade Required',
	428: 'Precondition Required',
	429: 'Too Many Requests',
	431: 'Request Header Fields Too Large',
	451: 'Unavailable For Legal Reasons',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
	505: 'HTTP Version Not Supported',
	507: 'Insufficient Storage',
	511: 'Network Authentication Required',
} as const;

// Functions

// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}

// CHeck if the device supports hover interactions or if it is a touch-only device
export function doesDeviceSupportHover() {
	return doesWindowExist() && window.matchMedia('(pointer: fine)').matches;
}

// Get a value from an object or return a default value if the key does not exist
// If defaultValue is not provided, throw an error when the key is not in the object
export function getOrDefault<T extends object, K extends keyof T, D>(
	obj: T,
	key: K | number | string | undefined,
	defaultValue?: D,
): T[K] | D {
	if (key === undefined || !(key in obj)) {
		if (defaultValue === undefined) {
			throw new Error(
				`Key '${String(key)}' not found in object and no default value provided.`,
			);
		}

		return defaultValue as D;
	}

	return obj[key as K];
}

// Get the description associated with a given status code
export function getStatusCodeDescription(statusCode: number): string {
	return getOrDefault(
		STATUS_CODE_MESSAGE_MAP,
		statusCode,
		'Unknown Status Code',
	);
}

// Combine multiple class names into a single string
export function getClassNameProps(
	...classNames: (string | false | undefined)[]
): PropsWithClassName {
	return {
		className: classNames.filter((className) => className).join(' '),
	};
}

// Clamp a value between a minimum and maximum value
export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

// Convert a string to kebab case
export function toKebabCase(string: string) {
	return string
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}

// Capitalize the first letter of a word
function capitalizeWord(word: string): Capitalize<string> {
	return `${word[0].toUpperCase()}${word.substring(1)}` as Capitalize<string>;
}

// Convert a string to title case
export function toTitleCase(string: string) {
	return string.split(/[-_ ]/).map(capitalizeWord).join(' ');
}

// Take a string and return it formatted as a proper sentence if it is not already (ie. capitalized and punctuated)
export function toSentence(string: string): SentenceString {
	const capitalizedString = capitalizeWord(string);

	// If string ends with period, comma, exclamation point, question mark, or ellipsis, return as is
	if (capitalizedString.match(/[\.,!?\u2026]$/)) {
		return capitalizedString as SentenceString;
	}

	return `${capitalizedString}.`;
}

// Return a JSON string with human-readable formatting
export function prettify(json: object | undefined | null) {
	return JSON.stringify(json, null, 2);
}

// Given a path, return the absolute URL
export function getAbsoluteUrl(path: string) {
	return new URL(path, SITE_METADATA.siteUrl);
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

// Return the first n elements of an array
export function limit<T>(array: T[], limit: number): T[] {
	return array.slice(0, limit);
}

// Return true if a value is defined
export function isDefined<T>(value: T): value is NonNullable<T> {
	return value !== undefined && value !== null;
}

// Throw an error if a value is not defined
export function assertIsDefined<T>(
	value: T,
	msg?: string,
): asserts value is NonNullable<T> {
	if (!isDefined(value)) {
		panic(msg ?? 'Expected value to be defined, but it was not');
	}
}
