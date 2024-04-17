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
  test('fires tdsToggle event on click', async ({ page }) => {
    await page.goto(componentTestPath);
    const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
