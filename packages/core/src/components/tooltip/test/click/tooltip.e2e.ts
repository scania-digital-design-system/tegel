import { E2EPage, test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/tooltip/test/click/index.html';
const componentName = 'tds-tooltip';

const waitForHydration = async (page: E2EPage) => {
  await expect(page.locator('tds-tooltip')).toHaveClass(/hydrated/);
  await expect(page.locator('tds-button#button-3')).toHaveClass(/hydrated/);
};

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
      await waitForHydration(page);
    });

    test('renders the tooltip correctly', async ({ page }) => {
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Should appears on button click', async ({ page }) => {
      // Select the button that triggers the tooltip on click
      const button = page.locator('tds-button#button-3');

      await button.click();
      await page.waitForChanges();

      const tooltipText = page.locator('text=Text inside Tooltip');

      // Assert that the tooltip is visible after clicking the button
      await expect(tooltipText).toBeVisible();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    await waitForHydration(page);
  });

  test('Should not appear on hover', async ({ page }) => {
    // Select the button that triggers the tooltip on click
    const button = page.locator('tds-button#button-3');

    await button.hover();
    await page.waitForChanges();

    const tooltipText = page.locator('text=Text inside Tooltip');

    // Assert that the tooltip is visible after clicking the button
    await expect(tooltipText).toBeHidden();
  });

  test('Should contain correct HTML content on click', async ({ page }) => {
    // Hover over the button to trigger the tooltip
    const button = page.locator('tds-button#button-3');

    await button.click();
    await page.waitForChanges();

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
