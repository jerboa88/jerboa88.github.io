/**
 * Type definitions for common strings
 */

/**
 * Tailwind CSS background color class string
 *
 * @example 'bg-blue-500'
 */
export type BgColorString = `bg-${string}`;

/**
 * Absolute path string
 *
 * @example '/path/to/file'
 */
export type AbsolutePathString = `/${string}`;

/**
 * Working path string
 *
 * @example './path/to/file'
 */
export type WorkingPathString = `./${string}`;

/**
 * HTTPS URL string
 *
 * @example 'https://example.com'
 */
export type UrlString = `https://${string}`;

/**
 * Date string in the format YYYY-MM-DD
 *
 * @example '2021-01-01'
 */
export type DateString = `${20}${number}-${number}-${number}`;

/**
 * City and state string
 *
 * @example 'City, State'
 */
export type CityAndStateString = Capitalize<`${string}, ${string}`>;

/**
 * Sentence string with proper capitalization and punctuation
 *
 * @example 'This is a sentence.'
 */
export type SentenceString = Capitalize<`${string}${'.' | '!' | '?' | '…'}`>;
