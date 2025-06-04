/**
 * Processes HTML content to make it more accessible for screen readers by:
 * 1. Removing HTML tags while preserving their text content
 * 2. Converting HTML entities to their text equivalents
 * 3. Normalizing whitespace
 *
 * @param htmlContent - The HTML content to be processed for screen readers
 * @returns Clean, readable text suitable for screen readers
 *
 * @example
 * // Input: "<p>Hello <b>World</b> &amp; Universe!</p>"
 * // Output: "Hello World and Universe!"
 */
export const processHtmlForScreenReader = (htmlContent: string): string => {
  if (!htmlContent) return '';

  return (
    htmlContent
      // Remove HTML tags
      .replace(/<[^>]*>/g, ' ')
      // Replace common HTML entities with their text equivalents
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, 'and')
      .replace(/&lt;/g, 'less than')
      .replace(/&gt;/g, 'greater than')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
};
