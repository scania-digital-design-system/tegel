import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  getTestDescribeText,
  setupPage,
  testConfigurations,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/banner/test/default/index.html';
const componentName = 'tds-banner';
const testDescription = 'tds-banner-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default banner correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('header exists', async ({ page }) => {
      const bannerHeader = page.getByText('This is a header text area', { exact: true });
      await expect(bannerHeader).toBeVisible();
    });

    test('text exists', async ({ page }) => {
      const bannerSubheader = page.getByText('This is the subheader text area', { exact: true });
      await expect(bannerSubheader).toBeVisible();
    });

    test('icons exists', async ({ page }) => {
      const images = page.getByRole('img');
      await expect(images).toHaveCount(2);
    });

    test('link example exists', async ({ page }) => {
      const linkExample = page.getByRole('link');
      await expect(linkExample).toHaveCount(1);
      await expect(linkExample).toBeVisible();
    });

    test('close button exists', async ({ page }) => {
      const closeButton = page.getByRole('button');
      await expect(closeButton).toHaveCount(1);
      await expect(closeButton).toBeVisible();
    });
  });
});
