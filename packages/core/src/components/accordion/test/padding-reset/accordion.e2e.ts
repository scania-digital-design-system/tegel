import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-accordiong', () => {
  test('renders padding-reset accordion correctly', async ({ page }) => {
    await page.goto('src/components/accordion/test/padding-reset/index.html');
    const accordion = page.locator('tds-accordion');
    await expect(accordion).toHaveClass(/hydrated/);
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
  test('does fire tdsToggle event on click on accordion', async ({ page }) => {
    await page.goto('src/components/accordion/test/padding-reset/index.html');
    const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click({
      position: {
        x: 1,
        y: 1,
      },
    });
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
