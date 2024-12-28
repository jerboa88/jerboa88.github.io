type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type MonthDigits =
	| '01'
	| '02'
	| '03'
	| '04'
	| '05'
	| '06'
	| '07'
	| '08'
	| '09'
	| '10'
	| '11'
	| '12';

type DayDigits =
	| '01'
	| '02'
	| '03'
	| '04'
	| '05'
	| '06'
	| '07'
	| '08'
	| '09'
	| '10'
	| '11'
	| '12'
	| '13'
	| '14'
	| '15'
	| '16'
	| '17'
	| '18'
	| '19'
	| '20'
	| '21'
	| '22'
	| '23'
	| '24'
	| '25'
	| '26'
	| '27'
	| '28'
	| '29'
	| '30'
	| '31';

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
export type DateString = `${20}${1 | 2}${Digit}-${MonthDigits}-${DayDigits}`;

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
