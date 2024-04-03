import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-menu/test/show-false/index.html';

test.describe.parallel('tds-popover-menu-show-false', () => {
  test('renders show=false popover-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the trigger button should not open the popover menu dialog when show is false', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    const dropDownList = page.getByRole('list');

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeHidden();

    await triggerButton.click();

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeHidden();
  });
});
