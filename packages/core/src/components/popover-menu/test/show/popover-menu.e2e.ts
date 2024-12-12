import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-menu/test/show/index.html';

test.describe.parallel('tds-popover-menu-show', () => {
  test('renders show=true popover-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
  });

  test('clicking the trigger button should keep the popover menu dialog open when it is open by default', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    const dropDownList = page.getByRole('list');

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeVisible();

    await triggerButton.click();

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeVisible();
  });
});
