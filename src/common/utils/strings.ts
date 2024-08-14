import type { SentenceString } from '../../types/strings';

// Convert a string to kebab case
export function toKebabCase(string: string): Lowercase<string> {
	return string
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[\s_.]+/g, '-')
		.toLowerCase() as Lowercase<string>;
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

/**
 * Get the index of the start of the last word in a string
 *
 * @param string The string to search
 * @returns The index of the start of the last word in the string
 */
export function getStartIndexOfLastWord(string: string) {
	return string.indexOf(' ', -1) + 2;
}

// Return a JSON string with human-readable formatting
export function prettify(json: object | undefined | null) {
	return JSON.stringify(json, null, 2);
}
