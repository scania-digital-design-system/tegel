import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/tooltip/test/default/index.html';
const componentName = 'tds-tooltip';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders the tooltip correctly', async ({ page }) => {
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('tooltip appears on button hover', async ({ page }) => {
      // Select the button that triggers the tooltip on hover
      const button = page.locator('tds-button#button-1');

      // Use Playwright's hover method to simulate moving the mouse over the button
      await button.hover();

      const tooltip = page.locator('text=Text inside Tooltip');

      // Assert that the tooltip is visible after hovering over the button
      await tooltip.waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('tooltip contains correct HTML content on hover', async ({ page }) => {
    // Trick to reset the cursor position in order to restart hover effect later on
    await page.mouse.move(500, 500);

    // Hover over the button to trigger the tooltip
    const button = page.locator('tds-button#button-1');
    await button.hover();

    const tooltipParagraph = page.locator('.tooltip-paragraph');

    // Verify the paragraph is visible as part of the tooltip
    await expect(tooltipParagraph).toBeVisible();

    // Fetch the inner HTML of the tooltip paragraph
    let innerHtml = await tooltipParagraph.innerHTML();

    // Normalize whitespace in the inner HTML for comparison
    innerHtml = innerHtml.replace(/\s+/g, ' ').trim();

    // Remove class attributes from the inner HTML
    innerHtml = innerHtml.replace(/ class="[^"]*"/g, '');

    // Define the expected HTML content, ensuring to trim any potential whitespace for a precise match
    const expectedHtmlContent =
      'Paragraph tag inside of Tooltip with <b>bold</b> and <i>italic</i> tags too.';

    // Perform the comparison to verify the tooltip's content
    expect(innerHtml).toEqual(expectedHtmlContent);
  });
});
