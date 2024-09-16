// eslint-disable-next-line import/no-relative-packages
import { TAG_NAMES } from '../../../../src/utils/tagNames';

// Utils to handle tag names for 'tds-' prefixed components
export const getTagName = (el: HTMLElement): string => {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('Invalid element provided:', el);
    return ''; // Return a default or throw an error
  }
  return el.tagName.toLowerCase();
};

export const getTagNameWithoutPrefix = (host: HTMLElement): string => {
  const tagName = getTagName(host);
  const maxLength = 100; // Maximum length of the input string

  // Ensure the regex correctly captures the tag name after the prefix
  const match =
    /^((?:[a-z0-9]+-){0,maxLength})([a-z0-9-]+)$/.exec(tagName.slice(0, maxLength)) || [];
  const [, , tagNameWithoutPrefix = ''] = match;

  return tagNameWithoutPrefix;
};

export type PrefixedTagNames = Record<string, string>;

class PrefixedTagNamesCache extends Map<string, PrefixedTagNames> {
  lastPrefix?: string;
}

const PREFIXED_TAG_NAMES_CACHE = new PrefixedTagNamesCache();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const tagName = getTagName(host);

  // Generate a unique cache key based on the tag name
  const cacheKey = tagName;

  // Check if the cache needs to be updated
  if (!PREFIXED_TAG_NAMES_CACHE.has(cacheKey)) {
    const prefixedTagNames: PrefixedTagNames = TAG_NAMES.reduce(
      (result, tag) => ({
        ...result,
        [tag]: tag, // Use the tag name directly without adding a prefix
      }),
      {} as PrefixedTagNames,
    );

    PREFIXED_TAG_NAMES_CACHE.set(cacheKey, prefixedTagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(cacheKey) || {};
};
