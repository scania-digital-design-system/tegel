import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/side-menu/test/expand-toggle/index.html';

test.describe.parallel('tds-side-menu-toggle-expand', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('toggle collapse and expand programmatically', async ({ page }) => {
    const wrapper = await page.locator('tds-side-menu-dropdown > .wrapper');
    await expect(wrapper).toHaveClass(/state-open/);

    const dropdown = await page.locator('tds-side-menu-dropdown');
    await dropdown.evaluate((element) => {
      element.setAttribute('open', 'false');
    });
    await expect(wrapper).not.toHaveClass(/state-open/);

    await dropdown.evaluate((element) => {
      element.setAttribute('open', 'true');
    });
    await expect(wrapper).toHaveClass(/state-open/);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('collapse programmatically and expand on the UI', async ({ page }) => {
    const wrapper = await page.locator('tds-side-menu-dropdown > .wrapper');

    const dropdown = await page.locator('tds-side-menu-dropdown');
    await dropdown.evaluate((element) => {
      element.setAttribute('open', 'false');
    });
    await expect(wrapper).not.toHaveClass(/state-open/);

    await await page.getByText('Wheel types').click();
    await expect(wrapper).toHaveClass(/state-open/);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
