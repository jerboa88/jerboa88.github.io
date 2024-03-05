/*
	Reusable text components
	------------------------
*/


import React from 'react';
import HTMLComment from 'react-html-comment';


interface TextComponentPropsInterface {
	className?: string;
	children: React.ReactNode;
}


// Level 1 heading text
export function H1({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h1 className={`align-middle font-heading font-black uppercase drop-shadow-md interactive-scale ${className}`}>
			{children}
		</h1>
	);
}


// Level 2 heading text
export function H2({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h2 className={`m-4 p-8 text-3xl align-middle font-heading font-black drop-shadow-md ${className}`}>
			{children}
		</h2>
	);
}


// Level 3 heading text
export function H3({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h3 className={`my-4 text-l font-heading font-black drop-shadow ${className}`}>
			{children}
		</h3>
	);
}


// Paragraph text
export function P({ className = '', children }: TextComponentPropsInterface) {
	return (
		<p className={`m-4 text-sm ${className}`}>
			{children}
		</p>
	);
}


// Small text
export function S({ className = '', children }: TextComponentPropsInterface) {
	return (
		<small className={`m-2 inset-x-0 text-xs drop-shadow-sm ${className}`}>
			{children}
		</small>
	);
}


// Span
export function Span({ className = '', children }: TextComponentPropsInterface) {
	return (
		<span className={`text-sm ${className}`}>
			{children}
		</span>
	);
}


// HTML comment
export function C(props: { children: string }) {
	return (
		<HTMLComment text={props.children.toString()} />
	);
}
