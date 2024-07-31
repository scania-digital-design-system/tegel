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
  const [, tagNameWithoutPrefix = ''] = /^(tds-)([a-z0-9-]+)$/.exec(tagName) || [];
  return tagNameWithoutPrefix;
};

export type PrefixedTagNames = Record<string, string>;

const PREFIXED_TAG_NAMES_CACHE = new Map<string, PrefixedTagNames>();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const tagName = getTagName(host);
  const prefix = (window as any).customElementPrefix;

  // Use a fallback to the original tag names if no prefix is set
  if (!prefix) {
    return TAG_NAMES.reduce(
      (result, tag) => ({
        ...result,
        [tag]: tag, // Keep the 'tds-' prefix in the mapping
      }),
      {} as PrefixedTagNames,
    );
  }

  if (!PREFIXED_TAG_NAMES_CACHE.has(tagName)) {
    const prefixedTagNames: PrefixedTagNames = TAG_NAMES.reduce(
      (result, tag) => ({
        ...result,
        [`${prefix}-${tag}`]: tag, // Apply the prefix and map to the clean tag
      }),
      {} as PrefixedTagNames,
    );

    PREFIXED_TAG_NAMES_CACHE.set(tagName, prefixedTagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(tagName) || {};
};
