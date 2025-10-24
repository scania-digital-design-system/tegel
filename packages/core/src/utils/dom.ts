export function isTag<T extends Element>(el: Element | null, tagName: string): el is T {
  return !!el && el.tagName === tagName.toUpperCase();
}

export function closestByTag<T extends Element>(start: Element, tagName: string): T | null {
  const found = start.closest(tagName);
  return isTag<T>(found, tagName) ? found : null;
}
