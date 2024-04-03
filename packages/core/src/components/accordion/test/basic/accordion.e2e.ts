import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe.parallel('tds-accordion', () => {
  test('renders basic accordion correctly', async ({ page }) => {
    await page.goto('src/components/accordion/test/basic/index.html');
    const accordion = page.locator('tds-accordion');
    await expect(accordion).toHaveClass(/hydrated/);
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
  test('fires tdsToggle event on click', async ({ page }) => {
    await page.goto('src/components/accordion/test/basic/index.html');
    const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
