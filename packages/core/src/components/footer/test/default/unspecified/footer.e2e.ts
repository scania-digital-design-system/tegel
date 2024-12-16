import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/footer/test/default/unspecified/index.html';

test.describe.parallel('tds-footer-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default footer correctly', async ({ page }) => {
    const footerComponent = page.locator('footer');
    await expect(footerComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Footer contains four links "Link text"', async ({ page }) => {
    const footerLinks = page.getByRole('link').filter({ hasText: /Link text/ });
    await expect(footerLinks).toHaveCount(4);
  });

  test('Footer contains three truck icons', async ({ page }) => {
    const footerTruckIcons = page.getByRole('link').filter({ has: page.getByRole('img') });
    await expect(footerTruckIcons).toHaveCount(3);
  });

  test('Footer contains copyright text', async ({ page }) => {
    const footerCopyrightText = page.getByText(`Copyright © ${new Date().getFullYear()} Scania`);
    await expect(footerCopyrightText).toHaveCount(1);
    await expect(footerCopyrightText).toBeVisible();
  });

  test('Footer contains brand label (Scania)', async ({ page }) => {
    const footerBrandText = page.getByText('Scania', { exact: true });
    await expect(footerBrandText).toHaveCount(1);
    await expect(footerBrandText).toBeHidden();
  });
});
