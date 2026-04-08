import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/tooltip/test/click/index.html';
const componentName = 'tds-tooltip';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders the tooltip correctly', async ({ page }) => {
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Should appear on button click', async ({ page }) => {
      const button = page.locator('tds-button#button-3');
      await button.click();

      const tooltipText = page.locator('text=Text inside Tooltip');
      await expect(tooltipText).toBeVisible();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Should appear on keyboard activation', async ({ page }) => {
      /* Click to open the tooltip */
      const button = page.locator('tds-button#button-3');
      await button.click();

      const tooltipText = page.locator('text=Text inside Tooltip');
      await expect(tooltipText).toBeVisible();

      /* Insert a hidden focusable element before the button and focus it,
         then Tab to the button — this is the only reliable way to get
         :focus-visible in Chromium (requires real keyboard Tab event) */
      await page.evaluate(() => {
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.style.cssText = 'position:absolute;opacity:0;pointer-events:none;';
        const tdsButton = document.querySelector('tds-button#button-3');
        tdsButton?.parentElement?.insertBefore(anchor, tdsButton);
        anchor.focus();
      });
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Should not appear on hover', async ({ page }) => {
    // Select the button that triggers the tooltip on click
    const button = page.locator('tds-button#button-3');

    await button.hover();

    const tooltipText = page.locator('text=Text inside Tooltip');

    // Assert that the tooltip is visible after clicking the button
    await expect(tooltipText).toBeHidden();
  });

  test('Should contain correct HTML content on click', async ({ page }) => {
    // Hover over the button to trigger the tooltip
    const button = page.locator('tds-button#button-3');
    await button.click();

    const tooltipParagraph = page.locator('.tooltip-paragraph');

    // Verify the paragraph is visible as part of the tooltip
    await expect(tooltipParagraph).toBeVisible();

    // Fetch the inner HTML of the tooltip paragraph
    let innerHtml = await tooltipParagraph.innerHTML();

    // Remove class attributes from the inner HTML for comparison
    innerHtml = innerHtml.replace(/ class="[^"]*"/g, '').trim();

    // Normalize whitespace in the inner HTML for comparison
    innerHtml = innerHtml.replace(/\s+/g, ' ').trim();

    // Define the expected HTML content, ensuring to trim any potential whitespace for a precise match
    const expectedHtmlContent =
      'Paragraph tag inside of Tooltip with <b>bold</b> and <i>italic</i> tags too.';

    // Perform the comparison to verify the tooltip's content
    expect(innerHtml).toEqual(expectedHtmlContent);
  });
});
