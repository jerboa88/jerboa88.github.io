/**
 * Utility functions for working with strings
 */

import type { SentenceString } from '../types/strings.ts';

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
	return `${word[0].toUpperCase()}${word.substring(1)}` as Capitalize<string>;
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
	return string.split(/[-_ ]/).map(capitalizeWord).join(' ');
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
	if (capitalizedString.match(/[\.,!?\u2026]$/)) {
		return capitalizedString as SentenceString;
	}

	return `${capitalizedString}.`;
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
