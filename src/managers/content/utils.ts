import { info, warn } from '../../node/logger.ts';
import {
	EntryVisibility,
	type PageContentEntryConfig,
} from '../../types/content/content.ts';
import type { FilterFn, SortFn } from '../../types/other.ts';
import {
	findIndexOfSubstringInArray,
	keysOf,
	limit,
	prettify,
} from '../../utils/other.ts';

// Types

type FilteredEntrySetsMaps<T> = {
	[EntryVisibility.Show]: Set<T>;
	[EntryVisibility.Hide]: Set<T>;
};

type ConfigEntrySetsMap<T> = FilteredEntrySetsMaps<T> & {
	[EntryVisibility.Pin]: Set<T>;
};

type EntrySetsMap<T> = {
	config: ConfigEntrySetsMap<T>;
	filtered: FilteredEntrySetsMaps<T>;
};

// Functions

/**
 * Given a config object for a single content entry, returns the maximum amount of items to display. If the limit is not specified, returns the maximum safe integer.
 *
 * @param pageEntryConfig The config object for a single content entry.
 * @returns The max amount of items to display.
 */
export function getPageEntriesLimit<T>(
	pageEntryConfig: PageContentEntryConfig<T>,
) {
	return pageEntryConfig?.limit ?? Number.MAX_SAFE_INTEGER;
}

/**
 * Given a list of all entries and a list of entry IDs from a page entries config object, returns a set of entries that match those from the page entries config object.
 *
 * @remarks
 *
 * Substring matching is used so that we can match entries that may contain multiple words (ie. "JavaScript" will match "JavaScript/TypeScript").
 *
 * @param allEntries A list of all entries to search through.
 * @param pageEntryIds A list of entry IDs from a page entries config object.
 * @param getEntryIdFn A function that returns the entry ID for a given entry.
 * @returns The set of entries that match those from the page entries config object.
 */
function filterEntriesByIds<T>(
	allEntries: T[],
	pageEntryIds: string[],
	getEntryIdFn: (entry: T) => string,
) {
	const allEntryIds = allEntries.map(getEntryIdFn);
	const set = new Set<T>();

	for (const pageEntryId of pageEntryIds) {
		const matchIndex = findIndexOfSubstringInArray(allEntryIds, pageEntryId);

		if (matchIndex === -1) {
			warn(`Configured entry '${pageEntryId}' not found`);

			continue;
		}

		set.add(allEntries[matchIndex]);
	}

	return set;
}

/**
 * Filters the list of entries based on the entry IDs defined in the provided page content entry config.
 *
 * @param pageContentEntryConfig The page content entry config object containing the entry IDs for each visibility type.
 * @param allEntries The list of all entries to filter.
 * @param getEntryIdFn A function that returns the entry ID for a given entry.
 * @returns An object containing the filtered entries for each visibility type.
 */
function filterEntriesUsingConfig<T>(
	pageContentEntryConfig: PageContentEntryConfig<T>,
	allEntries: T[],
	getEntryNameFn: (entry: T) => string,
) {
	const entrySetsMap: ConfigEntrySetsMap<T> = {
		[EntryVisibility.Pin]: new Set<T>(),
		[EntryVisibility.Show]: new Set<T>(),
		[EntryVisibility.Hide]: new Set<T>(),
	};
	const visibilityTypes = keysOf(entrySetsMap);

	for (const visibilityType of visibilityTypes) {
		const pageEntryIds = pageContentEntryConfig[visibilityType];

		// If there is no section for this visibility type in the config, skip it
		if (!pageEntryIds) {
			continue;
		}

		entrySetsMap[visibilityType] = filterEntriesByIds(
			allEntries,
			pageEntryIds,
			getEntryNameFn,
		);
	}

	return entrySetsMap;
}

/**
 * Filters the list of entries with the provided filter functions.
 *
 * @param allEntries The list of all entries to filter.
 * @param entryShowFilterFn The filter function to determine which entries to show.
 * @param entryHideFilterFn The filter function to determine which entries to hide.
 * @returns An object containing the filtered entries for each visibility type.
 */
function filterEntriesUsingFns<T>(
	allEntries: T[],
	entryShowFilterFn: FilterFn<T> | undefined,
	entryHideFilterFn: FilterFn<T> | undefined,
) {
	const entrySetsMap: FilteredEntrySetsMaps<T> = {
		[EntryVisibility.Show]: new Set<T>(
			entryShowFilterFn ? allEntries.filter(entryShowFilterFn) : [],
		),
		[EntryVisibility.Hide]: new Set<T>(
			entryHideFilterFn ? allEntries.filter(entryHideFilterFn) : [],
		),
	};

	return entrySetsMap;
}

/**
 * Given a list of entries, a page content entry config, and various transformation functions, returns a filtered and transformed list of entries.
 *
 * @remarks
 *
 * The list is:
 * - filtered:
 *   - based on the provided filter functions, if provided. Visibility settings from the page content entry config will override these filters.
 *   - based on the visibility settings in the page content entry config. Pinned entries are always shown, hidden entries are always hidden, and the rest are shown if they can be included within the limit.
 * - limited to the number of entries specified in the page content entry config, if provided.
 * - sorted using the provided sort function.
 *
 * @param pagePath The path of the page that the entries are being filtered for. This is used for logging only
 * @param allEntries The list of all entries.
 * @param pageContentEntryConfig The page content entry config object.
 * @param getEntryIdFn A function that returns the entry ID for a given entry.
 * @param entrySortFn A function that sorts entries.
 * @param entryShowFilterFn A function that filters entries to be shown.
 * @param entryHideFilterFn A function that filters entries to be hidden.
 * @returns The filtered and transformed list of entries.
 */
export function filterEntries<T>(
	pagePath: string,
	allEntries: T[],
	pageContentEntryConfig: PageContentEntryConfig<T>,
	getEntryIdFn: (entry: T) => string,
	entrySortFn?: SortFn<T>,
	entryShowFilterFn?: FilterFn<T>,
	entryHideFilterFn?: FilterFn<T>,
) {
	const allSortedEntries = allEntries.sort(entrySortFn);

	// If config isn't provided, return all entries
	if (!pageContentEntryConfig) {
		return allSortedEntries;
	}

	const pageEntriesLimit = getPageEntriesLimit(pageContentEntryConfig);
	const entrySetsMap: EntrySetsMap<T> = {
		config: filterEntriesUsingConfig(
			pageContentEntryConfig,
			allSortedEntries,
			getEntryIdFn,
		),
		filtered: filterEntriesUsingFns(
			allSortedEntries,
			entryShowFilterFn,
			entryHideFilterFn,
		),
	};
	// Stringify the entry sets map for debug logging
	const prettyEntrySetsMap = prettify(entrySetsMap, (_key, value) => {
		try {
			return getEntryIdFn(value) ?? value;
		} catch {
			return value;
		}
	});

	info(`Entry filtering results for page ${pagePath}: ${prettyEntrySetsMap}`);

	// Explicit config should override automatic filtering
	// ie. config.pin ∪ (config.show ∪ ((filtered.show ∪ allEntries - filtered.hide) - config.hide)
	const filteredEntries = limit(
		Array.from(
			entrySetsMap.config[EntryVisibility.Pin]
				.union(
					entrySetsMap.config[EntryVisibility.Show].union(
						entrySetsMap.filtered[EntryVisibility.Show]
							.union(new Set(allSortedEntries))
							.difference(entrySetsMap.filtered[EntryVisibility.Hide]),
					),
				)
				.difference(entrySetsMap.config[EntryVisibility.Hide]),
		),
		pageEntriesLimit,
	);

	// Sort the final list
	return filteredEntries.sort(entrySortFn);
}
