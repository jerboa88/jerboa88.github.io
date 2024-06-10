/*
	Helper functions that are used throughout the application
	---------------------------------------------------------
*/


import { PropsWithClassName } from './types';


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
	418: 'I\'m a teapot',
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
export function getOrDefault<T, K extends keyof T, D extends any>(object: T, key: K | number | string | undefined, defaultValue: D): T[K] | D {
	return object[key as K] ?? defaultValue as D;
}


// Get the description associated with a given status code
export function getStatusCodeDescription(statusCode: number): string {
	return getOrDefault(STATUS_CODE_MESSAGE_MAP, statusCode, 'Unknown Status Code');
}


// Combine multiple class names into a single string
export function getClassNameProps(...classNames: (string | false | undefined)[]): PropsWithClassName {
	return {
		className: classNames.filter(className => className).join(' '),
	};
}


// Clamp a value between a minimum and maximum value
export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
};


// Convert a string to kebab case
export function toKebabCase(string: string) {
	return string
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}
