/**
 * Gets the appropriate aria-invalid value for form components.
 *
 * This utility handles cross-framework compatibility by checking for an explicit
 * aria-invalid attribute on the host element first, then falling back to the
 * component's state. It properly handles both string and boolean values that
 * may be passed from different frameworks (especially React).
 *
 * @param host - The host element to check for aria-invalid attribute
 * @param state - The component's state ('error', 'success', 'default')
 * @returns The aria-invalid value as a string ('true' or 'false')
 *
 */
export const getAriaInvalid = (host: HTMLElement, state: string): string => {
  const hostAriaInvalid = host.getAttribute('aria-invalid');

  if (hostAriaInvalid !== null) {
    return String(hostAriaInvalid);
  }

  // Fallback to state-based aria-invalid
  return state === 'error' ? 'true' : 'false';
};
