function isFocusable(element: HTMLElement): boolean {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  // Check if the element matches any of the focusable elements selectors
  if (focusableSelectors.some((selector) => element.matches(selector))) {
    return true;
  }

  // Check if the element is contenteditable
  if (element.hasAttribute('contenteditable')) {
    const contentEditableValue = element.getAttribute('contenteditable').toLowerCase();
    if (contentEditableValue === 'true' || contentEditableValue === '') {
      return true;
    }
  }

  return false;
}
export default isFocusable;
