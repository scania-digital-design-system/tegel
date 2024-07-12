import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/tooltip/test/click/index.html';

test.describe('tds-tooltip', () => {
  test('renders the tooltip correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Should not appear on hover', async ({ page }) => {
    await page.goto(componentTestPath);

    // Select the button that triggers the tooltip on click
    const button = page.locator('tds-button#button-3');

    await button.hover();

    const tooltipText = page.locator('text=Text inside Tooltip');

    // Assert that the tooltip is visible after clicking the button
    await expect(tooltipText).toBeHidden();
  });

  test('Should appears on button click', async ({ page }) => {
    await page.goto(componentTestPath);

    // Select the button that triggers the tooltip on click
    const button = page.locator('tds-button#button-3');

    await button.click();

    const tooltipText = page.locator('text=Text inside Tooltip');

    // Assert that the tooltip is visible after clicking the button
    await expect(tooltipText).toBeVisible();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Should contain correct HTML content on click', async ({ page }) => {
    await page.goto(componentTestPath);

    // Hover over the button to trigger the tooltip
    const button = page.locator('tds-button#button-3');
    await button.click();

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
