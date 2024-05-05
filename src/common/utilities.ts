/*
	Helper functions and constants that are used throughout the application
	-----------------------------------------------------------------------
*/


import defaultProjectImage from '../images/default-tile-bg.png'


// Constants

const fadeTransitionVariants = {
	hidden: {
		opacity: 0,
		scale: .8,
	},
	show: {
		opacity: 1,
		scale: 1,
	}
} as const;

// Status code information is adapted from https://github.com/prettymuchbryce/http-status-codes/blob/master/codes.json as is licensed under the MIT License
const statusCodeMessages = {
	202: 'Accepted',
	502: 'Bad Gateway',
	400: 'Bad Request',
	409: 'Conflict',
	100: 'Continue',
	201: 'Created',
	417: 'Expectation Failed',
	424: 'Failed Dependency',
	403: 'Forbidden',
	504: 'Gateway Timeout',
	410: 'Gone',
	505: 'HTTP Version Not Supported',
	418: 'I\'m a teapot',
	419: 'Insufficient Space on Resource',
	507: 'Insufficient Storage',
	500: 'Internal Server Error',
	411: 'Length Required',
	423: 'Locked',
	405: 'Method Not Allowed',
	301: 'Moved Permanently',
	302: 'Moved Temporarily',
	207: 'Multi-Status',
	300: 'Multiple Choices',
	511: 'Network Authentication Required',
	204: 'No Content',
	203: 'Non Authoritative Information',
	406: 'Not Acceptable',
	404: 'Not Found',
	501: 'Not Implemented',
	304: 'Not Modified',
	200: 'OK',
	206: 'Partial Content',
	402: 'Payment Required',
	308: 'Permanent Redirect',
	412: 'Precondition Failed',
	428: 'Precondition Required',
	102: 'Processing',
	103: 'Early Hints',
	426: 'Upgrade Required',
	407: 'Proxy Authentication Required',
	431: 'Request Header Fields Too Large',
	408: 'Request Timeout',
	413: 'Request Entity Too Large',
	414: 'Request-URI Too Long',
	416: 'Requested Range Not Satisfiable',
	205: 'Reset Content',
	303: 'See Other',
	503: 'Service Unavailable',
	101: 'Switching Protocols',
	307: 'Temporary Redirect',
	429: 'Too Many Requests',
	401: 'Unauthorized',
	451: 'Unavailable For Legal Reasons',
	422: 'Unprocessable Entity',
	415: 'Unsupported Media Type',
	421: 'Misdirected Request'
} as const;


// Functions

// Get a value from an object or return a default value if the key does not exist
export function getOrDefault<T, K extends keyof T, D extends any>(object: T, key: K | number | string, defaultValue: D): T[K] | D {
	return object[key as K] ?? defaultValue as D;
}


// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}


// CHeck if the device supports hover interactions or if it is a touch-only device
export function doesDeviceSupportHover() {
	return doesWindowExist() && window.matchMedia('(pointer: fine)').matches;
}


export function getProjectImage(imageUrl: string) {
	return imageUrl ? imageUrl : defaultProjectImage
}


// Props for enabling a fade-in animation for a Framer Motion component
export const withFadeInAnimation = {
	initial: fadeTransitionVariants.hidden,
	animate: fadeTransitionVariants.show,
	exit: fadeTransitionVariants.hidden,
} as const;


// Props for setting a spring transition on a Framer Motion component
export const withSpringTransition = {
	transition: {
		type: 'spring',
		stiffness: 220,
		damping: 20,
		restSpeed: .2,
		restDelta: .08,
	}
} as const;


// Props for setting an interactive card animation on a Framer Motion component
export const asInteractiveCard = {
	whileHover: {
		scale: 1.05,
	},
	whileTap: {
		scale: .95,
	},
} as const;


// Get the description associated with a given status code
export function getStatusCodeDescription(statusCode: number): string {
	return getOrDefault(statusCodeMessages, statusCode, 'Unknown Status Code');
}


// Clamp a value between a minimum and maximum value
export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
};
