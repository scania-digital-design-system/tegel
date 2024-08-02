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
  const [, , tagNameWithoutPrefix = ''] = /^((?:[a-z0-9]+-)?tds-)([a-z0-9-]+)$/.exec(tagName) || [];
  return tagNameWithoutPrefix;
};

export type PrefixedTagNames = Record<string, string>;

const PREFIXED_TAG_NAMES_CACHE = new Map<string, PrefixedTagNames>();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const tagName = getTagName(host);
  const defaultPrefix = 'tds';
  const externalPrefix = (window as any).customElementPrefix
    ? `${(window as any).customElementPrefix}-`
    : '';
  const fullPrefix = `${externalPrefix}${defaultPrefix}`;

  const cacheKey = `${fullPrefix}-${tagName}`;

  if (!PREFIXED_TAG_NAMES_CACHE.has(cacheKey)) {
    const prefixedTagNames: PrefixedTagNames = TAG_NAMES.reduce((result, tag) => {
      const prefixedTag = `${fullPrefix}-${tag}`;

      return {
        ...result,
        [prefixedTag]: tag,
      };
    }, {} as PrefixedTagNames);

    PREFIXED_TAG_NAMES_CACHE.set(cacheKey, prefixedTagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(cacheKey) || {};
};
