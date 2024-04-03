import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/card/test/clickable/index.html';

test.describe.parallel('tds-card-clickable', () => {
  test('renders clickable card correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const cardButton = page.getByRole('button');
    await cardButton.hover();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('card should contain a button that is clickable', async ({ page }) => {
    await page.goto(componentTestPath);
    const cardButton = page.getByRole('button');
    await expect(cardButton).toHaveCount(1);
    await expect(cardButton).toBeVisible();

    const myEventSpy = await page.spyOnEvent('click');
    await cardButton.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
