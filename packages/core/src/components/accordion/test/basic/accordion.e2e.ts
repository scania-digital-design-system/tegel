import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/basic/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion', () => {
  test('renders basic accordion correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const accordion = page.locator(accordionSelector);
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should handle hover on accordion items', async ({ page }) => {
    // Define selector for first accordion item
    await page.goto(componentTestPath);
    const accordionFirstItem = page.getByText('First item');

    // Hover first accordion item
    await accordionFirstItem.hover();

    // Expect cursor to be pointer
    await expect(accordionFirstItem).toHaveCSS('cursor', 'pointer');

    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByText('Second item');

    // Hover second accordion item
    await accordionSecondItem.hover();

    // Expect cursor to be pointer
    await expect(accordionSecondItem).toHaveCSS('cursor', 'pointer');
  });

  test('fires tdsToggle event on click', async ({ page }) => {
    await page.goto(componentTestPath);
    const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
