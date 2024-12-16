import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/header/test/default/darkmode/index.html';

test.describe.parallel('tds-header-default-darkmode', () => {
  test('renders default header correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByRole('navigation');
    await expect(headerComponent).toHaveCount(1);
    await expect(headerComponent).toBeVisible();

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('launcher should open on click', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentLuncherButton = page.getByRole('button');
    await headerComponentLuncherButton.click();

    const headerLuncherList = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('heading') })
      .getByRole('list');
    await expect(headerLuncherList).toHaveCount(1);
    await expect(headerLuncherList).toBeVisible();

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
