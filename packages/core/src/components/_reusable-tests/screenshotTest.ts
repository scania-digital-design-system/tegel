import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

export const screenshotTest = ({ componentTestPath, darkmode, backgroundColor }) => {
  const testDescription = `renders component with ${
    darkmode ? 'darkmode' : 'lightmode'
  } and ${backgroundColor} background`;

  test(testDescription, async ({ page }) => {
    await page.goto(componentTestPath);

    if (darkmode) {
      await page.evaluate(() => {
        document.body.classList.add('tds-mode-dark');
      });
    }

    await page.evaluate((color) => {
      document.body.setAttribute('style', `background-color: ${color}; padding: 20px`);
    }, backgroundColor);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
};
