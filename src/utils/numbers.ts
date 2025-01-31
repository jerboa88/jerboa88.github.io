/**
 * Utility functions for numbers
 */

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
 * Round a number down to a specified precision
 *
 * @param number The number to round down
 * @param precision The number of decimal places to round to (default: 0)
 * @returns The rounded number
 * @example
 * roundDown(1.23) // 1
 * roundDown(1.23, 1) // 1.2
 */
export function roundDown(number: number, precision = 0) {
	const factor = 10 ** precision;

	return Math.floor(number * factor) / factor;
}
