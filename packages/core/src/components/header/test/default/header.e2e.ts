import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/header/test/default/index.html';

test.describe('tds-header-default', () => {
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
    await expect(headerComponentHeaderText).toBeVisible();
    await expect(headerComponentHeaderText).toHaveCount(1);
  });

  test('luncher button icon exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentLuncherIcon = page.getByRole('button');
    await expect(headerComponentLuncherIcon).toBeVisible();
    await expect(headerComponentLuncherIcon).toHaveCount(1);
  });

  test('brand label with link exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponentBrandLink = page.getByRole('link');
    await expect(headerComponentBrandLink).toBeVisible();
    await expect(headerComponentBrandLink).toHaveCount(1);
  });
});
