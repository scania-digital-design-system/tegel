import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/hide-last-border/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders accordion with hidden last border correctly', async ({ page }) => {
    // Define selector for accordion
    const accordion = page.locator(accordionSelector);

    // Check if accordion contains the correct text
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    // Check screenshot diff to make sure the accordion is rendered correctly
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
