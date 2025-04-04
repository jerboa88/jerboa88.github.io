/**
 * Assorted utility functions
 */

import { panic } from '../node/logger.ts';
import type { PropsWithClassName } from '../types/components.ts';
import type { EmptyObject, Maybe, Nullable } from '../types/utils.ts';

// Types

type StringifyReplacerFn<T, U> = Maybe<
	(this: unknown, key: string, value: T) => U
>;

/**
 * Returns an empty object type if the input value is undefined or null, otherwise returns an object with the input key and non-null value
 *
 * @typeParam K - The type of the object's key
 * @typeParam V - The type of the object's value
 */
type IfDefinedResult<K extends string, V> = V extends null | undefined
	? EmptyObject
	: { [P in K]: NonNullable<V> };

/**
 * Returns undefined if the input argument is undefined or null, otherwise returns the return type of the function
 *
 * @typeParam A - The input argument type
 * @typeParam R - The return type
 */
type CallIfDefinedResult<A, R> = A extends null | undefined ? undefined : R;

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
	key: string | number | symbol,
	defaultValue?: D,
): T[K] | D {
	if (!(isDefined(key) && key in obj)) {
		if (!isDefined(defaultValue)) {
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
 * @param baseClassName - The base class name
 * @param classNames - The class names to combine
 * @returns An object containing the combined class name string
 */
export function getClassNameProps(
	baseClassName: string,
	...classNames: Maybe<string | false>[]
): Required<PropsWithClassName>;

/**
 * Combine multiple class names into a single string
 *
 * @param classNames - The class names to combine
 * @returns An object containing the combined class name string, or an empty object if no class names are provided
 */
export function getClassNameProps(
	...classNames: Maybe<string | false>[]
): PropsWithClassName;

/**
 * Combine multiple class names into a single string
 *
 * @param classNames - The class names to combine
 * @returns An object containing the combined class name string
 */
export function getClassNameProps(
	...classNames: Maybe<string | false>[]
): EmptyObject | Required<PropsWithClassName> {
	const filteredClassNames = classNames.filter((className) => className);

	if (filteredClassNames.length === 0) {
		return {};
	}

	return {
		className: filteredClassNames.join(' '),
	};
}

/**
 * When used in JSON.stringify, this function will replace any Set instances with an Array
 *
 * @typeParam T The type of the input value
 * @param value The value of the property being stringified
 * @returns The value to use in the stringified JSON
 */
function stringifyReplaceSetWithArray<T>(value: T) {
	return value instanceof Set ? Array.from<T>(value) : value;
}

/**
 * Return a JSON string with human-readable formatting
 *
 * @param obj - The JSON object to prettify
 * @param replacerFn - A function to call for each element being stringified
 * @returns The prettified JSON string
 */
export function prettify<T = unknown>(
	obj: Maybe<Nullable<object>>,
	replacerFn?: StringifyReplacerFn<T | T[], unknown>,
) {
	const compoundReplacerFn = (_key: string, value: T) => {
		const newValue = stringifyReplaceSetWithArray(value);

		return replacerFn ? replacerFn?.(_key, newValue) : newValue;
	};

	return JSON.stringify(obj, compoundReplacerFn, '\t');
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
	array: readonly string[],
	substring: string,
): number {
	return array.findIndex((item) => item.includes(substring));
}

/**
 * Convert an array of objects into an object with a key-value pair
 *
 * @param array - An array of objects
 * @param keyOrFn - The key to use as the new object key, or a function that returns the key
 * @returns An object with keys generated from items in the input array, along with the corresponding values from the input array
 */
// export function arrayToMap<T extends object, K extends keyof T>(
// 	array: T[],
// 	key: K,
// ): Map<string, T>;

// export function arrayToMap<T, K extends (item: T) => string>(
// 	array: T[],
// 	fn: K,
// ): Map<string, T>;

// export function arrayToMap<T, K extends keyof T | ((item: T) => string)>(
// 	array: T[],
// 	keyOrFn: K,
// ): Map<string, T> {
// 	let keyValueMatrix: [string, T][];

// 	if (keyOrFn instanceof Function) {
// 		keyValueMatrix = array.map((item) => [keyOrFn(item), item]);
// 	} else {
// 		keyValueMatrix = array.map((item) => [
// 			String(item[keyOrFn as keyof T]),
// 			item,
// 		]);
// 	}

// 	return new Map(keyValueMatrix);
// }

/**
 * Get the keys of an object.
 *
 * @param obj The object to get the keys of.
 * @returns An array of the keys of the object.
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns the input object if its value is defined, otherwise an empty object. This is useful for conditional spreads.
 *
 * @typeParam K - The type of the key.
 * @typeParam V - The type of the value.
 * @param obj - An object with a single property.
 * @returns An object with the property if it is defined, otherwise an empty object.
 * @example
 * ifDefined({ foo: 'bar' }) // { foo: 'bar' }
 * ifDefined({ foo: undefined }) // {}
 */
export function ifDefined<K extends string, V>(
	obj: { [P in K]: V },
): IfDefinedResult<K, V> {
	const key = Object.keys(obj)[0] as K;
	const value = obj[key] as V;

	if (isDefined(value)) {
		return obj as IfDefinedResult<K, V>;
	}

	return {} as IfDefinedResult<K, V>;
}

/**
 * Calls the function if the argument is defined, otherwise returns undefined. This is useful for conditional function calls.
 *
 * @param fn - The function to call.
 * @param arg - The argument to pass to the function.
 * @returns The result of the function call if the argument is defined, otherwise undefined.
 * @example
 * callIfDefined((x) => x * 2, 3) // 6
 * callIfDefined((x) => x * 2, undefined) // undefined
 */
export function callIfDefined<A, R, V extends A | null | undefined>(
	fn: (arg: A) => R,
	arg: V,
): CallIfDefinedResult<V, R> {
	if (isDefined(arg)) {
		return fn(arg) as CallIfDefinedResult<V, R>;
	}

	return undefined as CallIfDefinedResult<V, R>;
}

/**
 * Returns true if the value is in an enum and false otherwise.
 *
 * @typeParam V - The type of the enum values. Must be a string or number.
 * @typeParam T - The type of the enum object. Must be a record with string keys and values of type V.
 * @param enumObj A TypeScript enum object.
 * @param value The value to check.
 * @returns True if the value is in the enum, false otherwise.
 * @example
 * enum Foo {
 * 	BAR = 'bar',
 * 	BAZ = 'baz',
 * }
 * isInEnum(Foo, 'bar') // true
 * isInEnum(Foo, 'qux') // false
 */
function isInEnum<V extends string | number, T extends Record<string, V>>(
	enumObj: T,
	value: V,
): value is T[keyof T] {
	return Object.values(enumObj).includes(value);
}

/**
 * Returns the enum value if it is in the enum, otherwise returns null.
 *
 * @typeParam V - The type of the enum values. Must be a string or number.
 * @typeParam T - The type of the enum object. Must be a record with string keys and values of type V.
 * @param enumObj A TypeScript enum object.
 * @param value The value to check.
 * @returns The enum value if it is in the enum, otherwise undefined.
 * @example
 * enum Foo {
 * 	BAR = 'bar',
 * 	BAZ = 'baz',
 * }
 * toEnum(Foo, 'bar') // Foo.BAR
 * toEnum(Foo, 'qux') // undefined
 */
export function toEnum<V extends string | number, T extends Record<string, V>>(
	enumObj: T,
	value: V,
): T[keyof T] | undefined {
	return isInEnum(enumObj, value) ? (value as T[keyof T]) : undefined;
}
