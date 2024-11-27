/**
 * Assorted utility functions
 */

import { panic } from '../../node/logger.ts';
import type { PropsWithClassName } from '../../types/components.ts';

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

/**
 * Return true if a value is defined
 *
 * @param value - The value to check
 * @returns True if the value is not undefined or null
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
	return value !== undefined && value !== null;
}

/**
 * Throw an error if a value is not defined
 *
 * @param value - The value to check
 * @param msg - Optional message to include in the error
 * @throws If the value is undefined or null
 */
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
 * @param value - The value to check
 * @throws An error with the provided value in the message
 */
export function assertUnreachable(value: never): never {
	throw new Error(`Unreachable code reached with value: ${value}`);
}

/**
 * Check if the window object exists. This will return false if the method is called from a server-side environment
 *
 * @returns True if the window object exists
 */
function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}

/**
 * Check if the device supports hover interactions or if it is a touch-only device
 *
 * @returns True if the device supports hover interactions
 */
export function doesDeviceSupportHover() {
	return doesWindowExist() && window.matchMedia('(pointer: fine)').matches;
}

/**
 * Get a value from an object or return a default value if the key does not exist. If `defaultValue` is not provided, throw an error when the key is not in the object
 *
 * @param obj - The object to get the value from
 * @param key - The key to look up in the object
 * @param defaultValue - The default value to return if the key does not exist
 * @returns The value from the object or the default value
 * @throws If the key is not found and no default value is provided
 */
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

/**
 * Get the description associated with a given HTTP status code
 *
 * @param statusCode - The status code to get the description for
 * @returns The description for the status code
 */
export function getStatusCodeDescription(statusCode: number): string {
	return getOrDefault(
		STATUS_CODE_MESSAGE_MAP,
		statusCode,
		'Unknown Status Code',
	);
}

/**
 * Combine multiple class names into a single string
 *
 * @param classNames - The class names to combine
 * @returns An object containing the combined class name string
 */
export function getClassNameProps(
	...classNames: (string | false | undefined)[]
): PropsWithClassName {
	return {
		className: classNames.filter((className) => className).join(' '),
	};
}

/**
 * Return a JSON string with human-readable formatting
 *
 * @param json - The JSON object to prettify
 * @returns The prettified JSON string
 */
export function prettify(json: object | undefined | null) {
	return JSON.stringify(json, null, 2);
}

/**
 * Clamp a value between a minimum and maximum value
 *
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

/**
 * Return the first n elements of an array
 *
 * @param array - The array to get the elements from
 * @param limit - The number of elements to return
 * @returns The first n elements of the array
 */
export function limit<T>(array: T[], limit: number): T[] {
	return array.slice(0, limit);
}

/**
 * Returns the index of the first string in the array that includes the substring. Returns -1 if no match is found.
 *
 * @param array - An array of strings to search through
 * @param substring - The substring to search for
 * @returns The index of the first match, or -1 if no match is found
 */
export function findIndexOfSubstringInArray(
	array: string[],
	substring: string,
): number {
	return array.findIndex((item) => item.includes(substring));
}

/**
 * Convert an array of objects into an object with a key-value pair
 *
 * @param array - An array of objects
 * @param key - The key to use as the new object key
 * @returns An object with keys generated from items in the input array, along with the corresponding values from the input array
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
 * @param obj - The object to remove undefined/null properties from
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
