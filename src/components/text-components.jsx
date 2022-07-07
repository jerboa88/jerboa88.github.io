// Various text components used in multiple pages
// Use functions for these components because they don't use state
import React from 'react';
import HTMLComment from 'react-html-comment';


// Level 1 heading text
export function H1(props) {
	return (
		<h1 className={`m-4 text-5xl align-middle font-["Montserrat"] font-black drop-shadow-md transition-transform hover:scale-110 ${props.className || ''}`}>
			{props.children}
		</h1>
	);
}


// Level 2 heading text
export function H2(props) {
	return (
		<h2 className={`m-4 p-8 text-3xl align-middle font-["Montserrat"] font-black drop-shadow-md ${props.className || ''}`}>
			{props.children}
		</h2>
	);
}


// Level 3 heading text
export function H3(props) {
	return (
		<h3 className={`my-4 text-l font-["Montserrat"] font-black drop-shadow ${props.className || ''}`}>
			{props.children}
		</h3>
	);
}


// Paragraph text
export function P(props) {
	return (
		<p className={`m-4 text-sm ${props.className || ''}`}>
			{props.children}
		</p>
	);
}


// Small text
export function S(props) {
	return (
		<small className={`m-2 inset-x-0 text-xs drop-shadow-sm ${props.className || ''}`}>
			{props.children}
		</small>
	);
}


// HTML comment
export function C(props) {
	return (
		<HTMLComment text={props.children.toString()} />
	);
}
