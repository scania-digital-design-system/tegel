import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/banner/test/default/index.html';

test.describe.parallel('tds-banner-default', () => {
  test('renders default banner correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('header exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const bannerHeader = page.getByText('This is a header text area', { exact: true });
    await expect(bannerHeader).toBeVisible();
  });

  test('text exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const bannerSubheader = page.getByText('This is the subheader text area', { exact: true });
    await expect(bannerSubheader).toBeVisible();
  });

  test('icons exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const images = page.getByRole('img');
    await expect(images).toHaveCount(2);
  });

  test('link example exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const linkExample = page.getByRole('link');
    await expect(linkExample).toHaveCount(1);
    await expect(linkExample).toBeVisible();
  });

  test('close button exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const closeButton = page.getByRole('button');
    await expect(closeButton).toHaveCount(1);
    await expect(closeButton).toBeVisible();
  });
});
