/**
 * Type definitions for common components and their props
 */

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { LayoutProps } from 'motion/react';
import type { RefObject } from 'react';
import type {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
	UseFormRegisterReturn,
} from 'react-hook-form';

/**
 * Props for components that accept an optional class name
 */
export interface PropsWithClassName {
	className?: string;
}

/**
 * Props for components that accept optional layout animations using Motion
 */
export interface PropsWithLayoutAnimations {
	layout?: LayoutProps['layout'];
	layoutRoot?: LayoutProps['layoutRoot'];
}

/**
 * An enumeration of possible Tailwind CSS breakpoints
 */
export enum Breakpoint {
	Default = 0,
	Sm = 1,
	Md = 2,
	Lg = 3,
	Xl = 4,
}

/**
 * A page section with a title and a reference to the section element
 */
export interface PageSection {
	title: string;
	ref: RefObject<HTMLElement>;
}

/**
 * An enumeration of possible alert types
 */
export enum AlertType {
	Info = 0,
	Success = 1,
	Warning = 2,
	Error = 3,
}

/**
 * A reusable interface for links
 */
export interface Link {
	to: string;
	isInternal?: boolean;
	rel?: string;
}

/**
 * An enumeration of possible tooltip positions
 */
export enum TooltipPosition {
	Left = 0,
	Right = 1,
	Top = 2,
	Bottom = 3,
}

/**
 * A reusable interface for buttons
 */
export interface Button extends PropsWithClassName, PropsWithLayoutAnimations {
	iconClassName?: string;
	textClassName?: string;
	tooltipClassName?: string;
	isNotInteractive?: boolean;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	icon?: IconDefinition;
	text?: string | number;
	tooltipText?: string;
	tooltipPosition?: TooltipPosition;
	disabled?: boolean;
	responsive?: boolean;
	flip?: boolean;
}

/**
 * A function that renders a button element
 */
export type ButtonElementRenderFn = React.FunctionComponent<{
	className: string;
	tooltipPosition: TooltipPosition;
}>;

/**
 * Options to pass to {@link https://github.com/react-hook-form/react-hook-form | react-hook-form} for performing input validation
 */
export interface InputValidationOptions {
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	required?: boolean;
	disabled?: boolean;
}

/**
 * Common options for input elements
 */
export interface InputOptions {
	tabIndex?: React.HTMLAttributes<HTMLInputElement>['tabIndex'];
	// autocomplete is not supposed to have any effect on checkbox and radio inputs, but Firefox uses it anyway
	autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
}

/**
 * A function that renders an input element
 */
export type InputElementRenderFn = React.FunctionComponent<
	UseFormRegisterReturn<string>
>;

/**
 * A reusable interface for inputs
 */
export interface Input<T extends FieldValues>
	extends PropsWithClassName,
		PropsWithLayoutAnimations {
	labelClassName?: string;
	inputClassName?: string;
	name: Path<T>;
	label?: string;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	validationOptions?: InputValidationOptions;
}
