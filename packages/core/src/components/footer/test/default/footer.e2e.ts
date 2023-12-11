import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/footer/test/default/index.html';

test.describe('tds-footer-default', () => {
  test('renders default footer correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerComponent = page.locator('footer');
    await expect(footerComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Footer contains four links "Link text"', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerLinks = page.getByText('Link text');
    await expect(footerLinks).toHaveCount(4);
  });

  test('Footer contains three truck icons', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerTruckIcons = page.getByRole('img');
    await expect(footerTruckIcons).toHaveCount(3);
  });

  test('Footer contains copyright text', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerCopyrightText = page.getByText('Copyright © 2023 Scania');
    await expect(footerCopyrightText).toBeVisible();
  });

  test('Footer contains brand label (Scania)', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerBrandText = page.getByText('Scania', { exact: true });
    await expect(footerBrandText).toBeHidden();
  });
});
