/**
 * Checks if the given element is a heading element (h1-h6) or has a role of "heading".
 *
 * @param {HTMLElement} el - The element to check.
 * @returns {boolean} - True if the element is a heading element, false otherwise.
 */
const isHeadingElement = (el: HTMLElement) => {
  const tagName = el.tagName.toLowerCase();
  const role = el.getAttribute('role');
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName) || role === 'heading';
};

export default isHeadingElement;
