// A higher-order function to find the nested child of siblings matching a predicate,

import dfs from './dfs';

// based on a sibling traversal function (getNextSibling or getPreviousSibling).
function getNestedChildOfSiblingsMatching(
  element: HTMLElement,
  searchPredicate: (el: HTMLElement) => boolean,
  siblingTraversalFn: (el: HTMLElement) => HTMLElement | null,
): HTMLElement | null {
  // Start with the sibling of the provided element.
  let sibling = siblingTraversalFn(element);

  // Iterate through the siblings until there are no more siblings.
  while (sibling) {
    // Use the dfs helper function to find the deeply nested child
    // that matches the given criteria within the current sibling.
    const nestedChild = dfs(sibling, searchPredicate);

    // If a matching deeply nested child is found, return it.
    if (nestedChild) {
      return nestedChild;
    }

    // Move on to the next sibling.
    sibling = siblingTraversalFn(sibling);
  }

  // If no matching deeply nested child is found, return null.
  return null;
}

export default getNestedChildOfSiblingsMatching;
