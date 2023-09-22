/**
 * Recursively finds the first matching element or child based on a provided condition.
 *
 * @param {ParentNode} parentNode - The starting element or shadow root to search from.
 * @param {(el: HTMLElement) => boolean} searchPredicate - The condition to match the element, receives an HTMLElement and returns a boolean.
 * @param {boolean} [pierceShadow=false] - Whether to pierce through shadow DOM boundaries.
 * @returns {HTMLElement | null} - The first matching element or child, or null if none is found.
 */
function dfs(
  parentNode: ParentNode,
  searchPredicate: (el: HTMLElement) => boolean,
  pierceShadow = false,
): HTMLElement | null {
  if (parentNode instanceof HTMLElement && searchPredicate(parentNode)) {
    return parentNode;
  }

  const childElements =
    parentNode instanceof HTMLSlotElement
      ? parentNode.assignedElements({ flatten: true })
      : Array.from(parentNode.children);

  if (pierceShadow && parentNode instanceof HTMLElement && parentNode.shadowRoot) {
    childElements.push(...Array.from(parentNode.shadowRoot.children));
  }

  let foundElement: HTMLElement | null = null;
  childElements.some((child: HTMLElement) => {
    foundElement = dfs(child, searchPredicate, pierceShadow);
    return foundElement !== null;
  });

  return foundElement;
}
export default dfs;
