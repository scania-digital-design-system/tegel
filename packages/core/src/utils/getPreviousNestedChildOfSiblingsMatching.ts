import getNestedChildOfSiblingsMatching from './getNestedChildOfSiblingsMatching';
import getPreviousSibling from './getPreviousSibling';

/**
 * Searches for a previous sibling element that has a nested child element matching the provided search predicate.
 * The search starts from the given element and proceeds to its previous siblings, diving deep into each sibling's descendants.
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
 * const headingEl = getPreviousNestedChildOfSiblingsMatching(startingElement, searchPredicate);
 * console.log(headingEl); // Logs the <h2>Heading 2</h2> element
 */
const getPreviousNestedChildOfSiblingsMatching = (
  element: HTMLElement,
  searchPredicate: (el: HTMLElement) => boolean,
) => getNestedChildOfSiblingsMatching(element, searchPredicate, getPreviousSibling);

export default getPreviousNestedChildOfSiblingsMatching;
