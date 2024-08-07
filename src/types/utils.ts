/**
 * Utility type definitions
 */

/**
 * An object with no properties
 */
export type EmptyObject = Record<string, never>;

/**
 * Extend a type while overwriting the types of specified existing properties with new ones
 *
 * @typeParam T - The base type
 * @typeParam U - An object with the same keys as T, but with different types
 * @returns A new object with the same keys as T, but with the types of U
 */
export type Overwrite<T, U extends object> = Omit<T, keyof U> & U;
