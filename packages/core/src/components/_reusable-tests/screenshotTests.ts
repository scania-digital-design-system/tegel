import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

export const screenshotTests = (componentTestPath: string) => {
  test(`renders component with lightmode`, async ({ page }) => {
    await page.goto(componentTestPath);

    await page.evaluate(() => {
      document.body.setAttribute('style', `background-color: white; padding: 20px`);
    });

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test(`renders component with darkmode`, async ({ page }) => {
    await page.goto(componentTestPath);

    await page.evaluate(() => {
      document.body.classList.add('tds-mode-dark');
    });

    await page.evaluate(() => {
      document.body.setAttribute('style', `background-color: grey-958; padding: 20px`);
    });

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
};
