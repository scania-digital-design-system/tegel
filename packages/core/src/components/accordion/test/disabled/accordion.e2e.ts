import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-accordiong', () => {
  test('renders disabled accordion correctly', async ({ page }) => {
    await page.goto('src/components/accordion/test/disabled/index.html');
    const accordion = page.locator('tds-accordion');
    await expect(accordion).toHaveClass(/hydrated/);
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });
  test('does not fire tdsToggle event on click on disabled accordion', async ({ page }) => {
    await page.goto('src/components/accordion/test/disabled/index.html');
    const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
