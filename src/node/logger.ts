/**
 * Functions for logging messages to the console
 * ---------------------------------------------
 */

import type { Reporter } from 'gatsby';

// Constants

const TAB_SIZE = 2;

// Runtime vars

let reporter: Reporter | undefined;
let indentLevel = 0;
let indentString = '';

// Functions

/**
 * Set the indent string based on the current indent level.
 *
 * @remarks
 *
 * This function should be called whenever the indent level changes.
 *
 * @internal
 * @example
 * indentLevel = 2;
 * setIndentString();
 * console.log(indentString); // '    '
 * indentLevel = 0;
 * setIndentString();
 * console.log(indentString); // ''
 */
function setIndentString() {
	indentString = ' '.repeat(TAB_SIZE * indentLevel);
}

/**
 * Set the Gatsby Reporter to use for logging
 *
 * @param newReporter A Gatsby {@link  Reporter} object to use for logging
 */
export function setReporter(newReporter: Reporter) {
	reporter = newReporter;
}

/**
 * Print an informational message
 *
 * @param msg A message to print
 * @example
 * info('This is an informational message');
 */
export function info(msg: string) {
	(reporter ?? console).info(`${indentString}${msg}`);
}

/**
 * Print a warning message
 *
 * @param msg A message to print
 * @example
 * warn('This is a warning message');
 */
export function warn(msg: string) {
	(reporter ?? console).warn(`${indentString}${msg}`);
}

/**
 * Print an error message
 *
 * @param msg A message to print
 * @example
 * error('This is an error message');
 */
export function error(msg: string) {
	(reporter ?? console).error(`${indentString}${msg}`);
}

/**
 * Print an error message and exit the program immediately
 *
 * @param msg A message to print before exiting
 * @throws An error to stop execution
 * @example
 * panic('This is an error message');
 */
export function panic(msg: string): never {
	const error = new Error(`${indentString}${msg}`);

	if (reporter) {
		reporter.panic('', error);
	}

	throw error;
}

/**
 * Create an indented group of messages
 *
 * @remarks
 *
 * This function increases the indent level for all messages printed within the group.
 * Use {@link endLogGroup} to end the group.
 *
 * @example
 * group();
 * info('This message is indented');
 * group();
 * info('This message is indented twice');
 * groupEnd();
 * info('This message is indented');
 * groupEnd();
 * info('This message is not indented');
 */
export function startLogGroup() {
	indentLevel++;

	setIndentString();
}

/**
 * End an indented group of messages
 *
 * @remarks
 *
 * This function decreases the indent level for all messages printed within the group.
 * Use {@link startLogGroup} to start a group.
 *
 * @example
 * group();
 * info('This message is indented');
 * group();
 * info('This message is indented twice');
 * groupEnd();
 * info('This message is indented');
 * groupEnd();
 * info('This message is not indented');
 */
export function endLogGroup() {
	indentLevel = Math.max(0, indentLevel - 1);

	setIndentString();
}
