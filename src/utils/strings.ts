/**
 * Utility functions for working with strings
 */

import { SENTENCE_REGEX } from '../config/constants.ts';
import type { DateString, SentenceString } from '../types/strings.ts';
import { roundDown } from './numbers.ts';

// Constants

const WORD_SEPARATOR_REGEX = /[-_ ]/;

// Functions

/**
 * Convert a string to kebab-case
 *
 * @param string The string to convert
 * @returns The string in kebab-case
 * @example
 * toKebabCase('Hello World') // hello-world
 */
export function toKebabCase(string: string): Lowercase<string> {
	return string
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[\s_.]+/g, '-')
		.toLowerCase() as Lowercase<string>;
}

/**
 * Capitalize the first letter of a word
 *
 * @param word The word to capitalize
 * @returns The capitalized word
 * @example
 * capitalizeWord('hello') // Hello
 */
function capitalizeWord(word: string): Capitalize<string> {
	if (word === '') {
		return word as Capitalize<string>;
	}

	return `${(word[0] as string).toUpperCase()}${word.substring(1)}` as Capitalize<string>;
}

/**
 * Convert a string to title case
 *
 * @param string The string to convert
 * @returns The string in title case
 * @example
 * toTitleCase('hello-world') // Hello World
 */
export function toTitleCase(string: string) {
	return string.split(WORD_SEPARATOR_REGEX).map(capitalizeWord).join(' ');
}

/**
 * Take a string and return it formatted as a proper sentence if it is not already (ie. capitalized and punctuated)
 *
 * @param string The string to format
 * @returns The string formatted as a proper sentence
 * @example
 * toSentence('hello world') // Hello world.
 */
export function toSentence(string: string): SentenceString {
	const capitalizedString = capitalizeWord(string);

	// If string ends with period, comma, exclamation point, question mark, or ellipsis, return as is
	if (capitalizedString.match(SENTENCE_REGEX)) {
		return capitalizedString as SentenceString;
	}

	return `${capitalizedString}.`;
}

/**
 * Take a number and return it formatted as a string with a 'k' suffix if it is greater than 1000
 *
 * @param number The number to format
 * @returns The number formatted as a string with a 'k' suffix if it is greater than 1000
 * @example
 * toReadableNumber(123) // 123
 * toReadableNumber(1234) // 1.2k
 * toReadableNumber(12345) // 12k
 */
export function toReadableNumber(number: number) {
	if (number < 1000) {
		return number.toString();
	}

	const decimalPlaces = number < 10000 ? 1 : 0;

	return `${roundDown(number / 1000, decimalPlaces)}k`;
}

/**
 * Assert that a string is a valid date string
 *
 * @remarks
 *
 * This function does not necessarily mean that the string matches the DateString template literal, but it does mean that it is a valid date string. This is okay because:
 * - manually configured date fields will already use the DateString template literal
 * - for ingested date fields, we do not care about the exact format of the date string, only that it can be parsed into a Date object
 *
 * @param string The string to assert is a valid date string
 * @returns The string as a DateString
 * @throws TypeError if the string is not a valid date string
 * @example
 * assertIsDateString('2021-01-01') // '2021-01-01'
 * assertIsDateString('not a date') // throws Error("Date 'not a date' is invalid")
 */
export function assertIsDateString(string: string): DateString {
	if (Number.isNaN(Date.parse(string))) {
		throw new TypeError(`Date '${string}' is invalid'`);
	}

	return string as DateString;
}

/**
 * Get the index of the start of the last word in a string
 *
 * @param string The string to search
 * @returns The index of the start of the last word in the string
 * @example
 * getStartIndexOfLastWord('Hello world') // 7
 */
export function getStartIndexOfLastWord(string: string) {
	return string.indexOf(' ', -1) + 2;
}
