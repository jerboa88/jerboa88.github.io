/*
	Helper functions that are used throughout the application
	---------------------------------------------------------
*/

import { panic } from '../../node/logger';
import type { PropsWithClassName } from '../../types/components';
import { getSiteMetadata } from '../config-manager';

// Types

/**
 * Returns the same type as the input object, but without any undefined/null properties
 *
 * @typeParam T - The object type
 */
type WithoutUndefined<T extends object> = {
	[K in keyof T]: T[K] extends undefined | null ? never : T[K];
};

// Constants

export const SITE_METADATA = getSiteMetadata();

export const MIME_TYPE_MAP = {
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

/**
 * Throw an error if a value is of a type that should not be possible. This is used to check that all possible values of a discriminated union are handled.
 *
 * @param value The value to check
 */
export function assertUnreachable(value: never): never {
	throw new Error(`Unreachable code reached with value: ${value}`);
}

// Check if the window object exists
// This will return false if the method is called from a server-side environment
function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}

// Check if the device supports hover interactions or if it is a touch-only device
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

// Return the first n elements of an array
export function limit<T>(array: T[], limit: number): T[] {
	return array.slice(0, limit);
}

/**
 * Convert an array of objects into an object with a key-value pair
 *
 * @param array An array of objects
 * @param key The key to use as the new object key
 * @returns An array of objects where the key is the value of the specified key
 */
export function arrayToObject<T extends object, K extends keyof T>(
	array: T[],
	key: K,
): Record<string, T> {
	const keyValueMatrix = array.map((item) => [String(item[key]), item]);

	return Object.fromEntries(keyValueMatrix);
}

/**
 * Remove all undefined/null properties from an object
 *
 * @param obj The object to remove undefined/null properties from
 * @returns The object without any undefined/null properties
 */
export function removeUndefinedProps<T extends Record<string, unknown>>(
	obj: T,
): WithoutUndefined<T> {
	const definedEntries = Object.entries(obj).filter(
		([_, value]) => !isDefined(value),
	);

	return Object.fromEntries(definedEntries) as WithoutUndefined<T>;
}
