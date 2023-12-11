import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/header/test/default/index.html';

test.describe('tds-header-default', () => {
  test('renders default header correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByRole('navigation');
    await expect(headerComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Header title exists and is "Example: default"', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByText('Example: default');
    await expect(headerComponent).toBeVisible();
  });

  test('Header icon exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByRole('img');
    await expect(headerComponent).toBeVisible();
    await expect(headerComponent).toHaveCount(1);
  });

  test('Header brand label exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerComponent = page.getByRole('link');
    await expect(headerComponent).toBeVisible();
    await expect(headerComponent).toHaveCount(1);
  });
});
