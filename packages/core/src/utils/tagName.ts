// Utils to handle tag names for 'tds-' prefixed components

export const getTagName = (el: HTMLElement): string => el.tagName.toLowerCase();

export const getTagNameWithoutPrefix = (host: HTMLElement): string => {
  const tagName = getTagName(host);
  // regex allows both letters and digits
  const [, tagNameWithoutPrefix = ''] = /^(tds-)([a-z0-9-]+)$/.exec(tagName) || [];
  return tagNameWithoutPrefix;
};

export type PrefixedTagNames = Record<string, string>;

const baseTagNames = ['icon', 'input', 'text-field', 'chip']; // Add all necessary base component names

const PREFIXED_TAG_NAMES_CACHE = new Map<string, PrefixedTagNames>();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const tagName = getTagName(host);

  // regex allows both letters and digits
  const [, prefix = ''] = /^([a-z0-9-]+)-tds-[a-z0-9-]+$/.exec(tagName) || [];

  if (!PREFIXED_TAG_NAMES_CACHE.has(prefix)) {
    const prefixedTagNames: PrefixedTagNames = baseTagNames.reduce(
      (result, tag) => ({
        ...result,
        [tag]: prefix ? `${prefix}-tds-${tag}` : `tds-${tag}`,
      }),
      {} as PrefixedTagNames,
    );

    PREFIXED_TAG_NAMES_CACHE.set(prefix, prefixedTagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(prefix) || {};
};
