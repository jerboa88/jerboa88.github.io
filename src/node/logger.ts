/**
 * Functions for logging messages to the console
 * ---------------------------------------------
 */

import type { Reporter } from 'gatsby';

// Constants

const TAB_SIZE = 2;

// Runtime vars

let reporter: Reporter | undefined = undefined;
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
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.info(`${indentString}${msg}`);
}

/**
 * Print a warning message
 *
 * @param msg A message to print
 * @example
 * warn('This is a warning message');
 */
export function warn(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.warn(`${indentString}${msg}`);
}

/**
 * Print an error message
 *
 * @param msg A message to print
 * @example
 * error('This is an error message');
 */
export function error(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.error(`${indentString}${msg}`);
}

/**
 * Print an error message and exit the program immediately if running in a build context
 *
 * @param msg A message to print before exiting
 * @throws An error to stop execution if running in a build context
 * @example
 * panicOnBuild('This is an error message');
 */
export function panicOnBuild(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.panicOnBuild('', new Error(`${indentString}${msg}`));
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
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.panic('', new Error(`${indentString}${msg}`));

	throw new Error('Unreachable');
}

/**
 * Create an indented group of messages
 *
 * @remarks
 *
 * This function increases the indent level for all messages printed within the group.
 * Use {@link groupEnd} to end the group.
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
export function group() {
	indentLevel++;

	setIndentString();
}

/**
 * End an indented group of messages
 *
 * @remarks
 *
 * This function decreases the indent level for all messages printed within the group.
 * Use {@link group} to start a group.
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
export function groupEnd() {
	indentLevel = Math.max(0, indentLevel - 1);

	setIndentString();
}
