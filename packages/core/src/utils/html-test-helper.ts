// test-utils.js

import { test as playwrightTest } from 'stencil-playwright';
import { Expect, expect } from '@playwright/test';

/**
 * Generate a test HTML template with a component placeholder.
 * @param {string} componentName - The name of component (without the 'tds-' prefix).
 * @param {string} componentProps - Any component properties or attributes to include.
 * @returns {string} - The HTML template with the component placeholder.
 */
export function generateTestHTML(componentName: any, componentProps = '') {
  const componentWithPrefix = `tds-${componentName}>`;
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <title>Stencil Component Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="stylesheet" href="../../../../../dist/tegel/tegel.css" />
        <script type="module">
          import { defineCustomElements } from '../../../../../loader/index.es2017.js';
          defineCustomElements();
        </script>
      </head>
      <body>
        <${componentWithPrefix} ${componentProps}></${componentWithPrefix}>
      </body>
    </html>
  `;
}

/**
 * Custom wrapper function for Stencil Playwright tests.
 * @param {string} description - The description of the test suite.
 * @param {string} componentName - The name of the component (without the 'tds-' prefix).
 * @param {string} componentProps - Any component properties or attributes to include.
 * @param {Function} testFn - The function that defines the test cases.
 */
export function customTest(
  description: string,
  componentName: string,
  componentProps: string,
  testFn: { (expect: any): void; (arg0: Expect<{}>): void },
) {
  // Define the test suite with common setup
  playwrightTest.describe(description, () => {
    playwrightTest.beforeEach(async ({ page }) => {
      // setup the component DOM structure
      const testHTML = generateTestHTML(componentName, componentProps);
      await page.setContent(testHTML);
    });

    // Call the provided test function to define test cases
    testFn(expect);
  });
}
