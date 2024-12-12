import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/basic/secondary_lightmode/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion-secondary-lightmode', () => {
  test('renders basic accordion correctly with secondary mode variant and lightmode', async ({
    page,
  }) => {
    // Define selector for accordion
    await page.goto(componentTestPath);
    const accordion = page.locator(accordionSelector);

    // Check if accordion contains the correct text
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    // Check screenshot diff to make sure the accordion is rendered correctly
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('second accordion item opens on click', async ({ page }) => {
    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByText('Second item');

    // Hover second accordion item
    await accordionSecondItem.click();

    // Check screenshot diff to make sure the second accordion item is open
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
