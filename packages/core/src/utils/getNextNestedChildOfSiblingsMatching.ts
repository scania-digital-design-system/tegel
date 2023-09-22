import getNestedChildOfSiblingsMatching from './getNestedChildOfSiblingsMatching';
import getNextSibling from './getNextSibling';

/**
 * Searches for a next sibling element that has a nested child element matching the provided search predicate.
 * The search starts from the given element and proceeds to its next siblings, diving deep into each sibling's descendants.
 *
 * @param {HTMLElement} element - The starting element to begin the search from.
 * @param {(el: HTMLElement) => boolean} searchPredicate - A predicate function that checks if an element matches the desired condition.
 * @returns {HTMLElement | null} - The matching nested child element, or null if no matching element is found.
 *
 * @example
 * // HTML structure:
 * // <div>
 * //   <h1>Heading 1</h1>
 * //   <ul role="list">
 * //     <li>Item 1</li>
 * //   </ul>
 * // </div>
 * // <div>
 * //   <h2>Heading 2</h2>
 * //   <ul role="list">
 * //     <li>Item 2</li>
 * //   </ul>
 * // </div>
 *
 * const searchPredicate = (el) => el.tagName.toLowerCase() === 'h2';
 * const startingElement = document.querySelector('[role="list"]');
 * const headingEl = getNextNestedChildOfSiblingsMatching(startingElement, searchPredicate);
 * console.log(headingEl); // Logs the <h2>Heading 2</h2> element
 */
const getNextNestedChildOfSiblingsMatching = (
  element: HTMLElement,
  searchPredicate: (el: HTMLElement) => boolean,
) => getNestedChildOfSiblingsMatching(element, searchPredicate, getNextSibling);

export default getNextNestedChildOfSiblingsMatching;
