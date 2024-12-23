import { group, groupEnd, info } from '../../node/logger.ts';
import {
	EntryVisibility,
	type PageContentEntryConfig,
} from '../../types/content/content.ts';
import type { FilterFn } from '../../types/other.ts';
import { limit } from '../../utils/other.ts';

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
 * @param getEntryId A function that returns the entry ID for a given entry.
 * @param doPinEntry A function that filters entries to be pinned.
 * @param doShowEntry A function that filters entries to be shown.
 * @param doHideEntry A function that filters entries to be hidden.
 * @returns The filtered and transformed list of entries.
 */
export function filterEntries<T>(
	pagePath: string,
	allEntries: T[],
	pageContentEntryConfig: PageContentEntryConfig<T>,
	getEntryId: (entry: T) => string,
	doPinEntry?: FilterFn<T>,
	doShowEntry?: FilterFn<T>,
	doHideEntry?: FilterFn<T>,
) {
	const sortFn = pageContentEntryConfig?.sortFn;
	const allSortedEntries = allEntries.sort(sortFn);

	// If config isn't provided, return all entries
	if (!pageContentEntryConfig) {
		return allSortedEntries;
	}

	const pageEntriesLimit = getPageEntriesLimit(pageContentEntryConfig);
	const pagePinnedEntryIds = new Set(
		pageContentEntryConfig?.[EntryVisibility.Pin],
	);
	const pageShownEntryIds = new Set(
		pageContentEntryConfig?.[EntryVisibility.Show],
	);
	const pageHiddenEntryIds = new Set(
		pageContentEntryConfig?.[EntryVisibility.Hide],
	);
	const pinnedEntriesSet = new Set<T>();
	const shownEntriesSet = new Set<T>();

	info(`Filtering entries for page ${pagePath}...`);
	group();

	for (const entry of allSortedEntries) {
		const entryId = getEntryId(entry);

		if (
			!pageHiddenEntryIds.has(entryId) &&
			(pagePinnedEntryIds.has(entryId) || doPinEntry?.(entry))
		) {
			pinnedEntriesSet.add(entry);

			info(`📌 Pinned '${entryId}'`);
		} else if (
			// If NOT (hiddenByConfig OR hiddenByFn) OR shownByFn OR shownByConfig
			!(pageHiddenEntryIds.has(entryId) || doHideEntry?.(entry)) ||
			doShowEntry?.(entry) ||
			pageShownEntryIds.has(entryId)
		) {
			shownEntriesSet.add(entry);

			info(`👀 Showing '${entryId}'`);
		} else {
			info(`🙈 Hiding '${entryId}'`);
		}
	}

	groupEnd();

	const filteredEntries = limit(
		[...pinnedEntriesSet, ...shownEntriesSet],
		pageEntriesLimit,
	);

	// Sort the final list
	return filteredEntries.sort(sortFn);
}
