// eslint-disable-next-line import/no-relative-packages
import { TAG_NAMES, TagName, TagNameCamelCase } from './tagNames';

// Utils to handle tag names for 'tds-' prefixed components
export const getTagName = (el: HTMLElement): string => {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('Invalid element provided:', el);
    return ''; // Return a default or throw an error
  }
  return el.tagName.toLowerCase();
};

export const paramCaseToCamelCase = (str: string): string =>
  str.replace(/-(\w)/g, (_, group) => group.toUpperCase());

export const getTagNameWithoutPrefix = (host: HTMLElement): TagName => {
  const tagName = getTagName(host);
  const [, tagNameWithoutPrefix = ''] = /^(?:[a-z-]+-)?(tds-[a-z-]+)$/.exec(tagName) || [];
  return (tagNameWithoutPrefix || tagName) as TagName; // return tagName as fallback for default tags
};

export type PrefixedTagNames = Record<TagNameCamelCase, string>;

class PrefixedTagNamesCache extends Map<string, PrefixedTagNames> {
  lastPrefix?: string;
}

const PREFIXED_TAG_NAMES_CACHE = new PrefixedTagNamesCache();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = /^([a-z-]+)-tds-[a-z-]+$/.exec(getTagName(host)) || [];

  if (!PREFIXED_TAG_NAMES_CACHE.has(prefix)) {
    const tagNames: PrefixedTagNames = TAG_NAMES.reduce(
      prefix
        ? (result, tag) => ({
            ...result,
            [paramCaseToCamelCase(tag)]: `${prefix}-${tag}`,
          })
        : (result, tag) => ({
            ...result,
            [paramCaseToCamelCase(tag)]: tag,
          }),
      {} as PrefixedTagNames,
    );

    PREFIXED_TAG_NAMES_CACHE.set(prefix, tagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(prefix);
};
