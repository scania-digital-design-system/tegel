import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/header/test/default/index.html';

test.describe.parallel('tds-header-default', () => {
  test('renders default header correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByRole('navigation');
    await expect(headerComponent).toHaveCount(1);
    await expect(headerComponent).toBeVisible();

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('title exists and is "Example: default"', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentHeaderText = page.getByText('Example: default');
    await expect(headerComponentHeaderText).toHaveCount(1);
    await expect(headerComponentHeaderText).toBeVisible();
  });

  test('luncher button icon exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentLuncherButton = page.getByRole('button');
    await expect(headerComponentLuncherButton).toHaveCount(1);
    await expect(headerComponentLuncherButton).toBeVisible();
  });

  test('brand label with link exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentBrandLink = page.getByLabel('Scania - red gryphon on blue shield');
    await expect(headerComponentBrandLink).toHaveCount(1);
    await expect(headerComponentBrandLink).toBeVisible();
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
