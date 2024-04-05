/*
	Reusable text components
	------------------------
*/


import React, { PropsWithChildren } from 'react';


interface TextComponentPropsInterface extends PropsWithChildren {
	className?: string;
}


// Level 1 heading text
export function H1({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h1 className={`align-middle font-heading font-bold uppercase drop-shadow interactive-text ${className}`}>
			{children}
		</h1>
	);
}


// Level 2 heading text
export function H2({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h2 className={`py-4 text-3xl align-middle font-heading font-medium drop-shadow-md ${className}`}>
			{children}
		</h2>
	);
}


// Level 3 heading text
export function H3({ className = '', children }: TextComponentPropsInterface) {
	return (
		<h3 className={`my-4 text-l font-heading font-bold drop-shadow ${className}`}>
			{children}
		</h3>
	);
}


// Paragraph text
export function P({ className = '', children }: TextComponentPropsInterface) {
	return (
		<p className={`m-4 text-sm drop-shadow-sm ${className}`}>
			{children}
		</p>
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
