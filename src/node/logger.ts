/*
  Functions for logging messages to the console
*/

import type { Reporter } from 'gatsby';

// Constants

const TAB_SIZE = 2;

// Runtime vars

let reporter: Reporter | undefined = undefined;
let indentLevel = 0;
let indentString = '';

// Functions

// Compute and set the indent string based on the current indent level
function setIndentString() {
	indentString = ' '.repeat(TAB_SIZE * indentLevel);
}

// Set the Gatsby Reporter to use for logging
export function setReporter(newReporter: Reporter) {
	reporter = newReporter;
}

// Print an informational message
export function info(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.info(`${indentString}${msg}`);
}

// Print a warning message
export function warn(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.warn(`${indentString}${msg}`);
}

// Print an error message
export function panicOnBuild(msg: string) {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.panicOnBuild(`${indentString}${msg}`);
}

// Print an error message and exit the program immediately
export function panic(msg: string): never {
	if (!reporter) {
		throw new Error('Reporter is not set');
	}

	reporter.panic(`${indentString}${msg}`);

	throw new Error('Unreachable');
}

// Create an indented group of messages
export function group() {
	indentLevel++;

	setIndentString();
}

// End the current group of messages
export function groupEnd() {
	indentLevel = Math.max(0, indentLevel - 1);

	setIndentString();
}
