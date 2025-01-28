import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/card/test/default/index.html';
const componentName = 'tds-card';
const testDescription = 'tds-card-default';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default card correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('header text exists', async ({ page }) => {
    const cardHeaderText = page.getByText('Header text', { exact: true });
    await expect(cardHeaderText).toHaveCount(1);
    await expect(cardHeaderText).toBeVisible();
  });

  test('subheader text exists', async ({ page }) => {
    const cardSubheaderText = page.getByText('Subheader text', { exact: true });
    await expect(cardSubheaderText).toHaveCount(1);
    await expect(cardSubheaderText).toBeVisible();
  });

  test('arrow icon exists', async ({ page }) => {
    const cardTdsIcon = page.getByRole('img');
    await expect(cardTdsIcon).toHaveCount(1);
    await expect(cardTdsIcon).toBeVisible();
  });

  test('card should not contain a button that is clickable', async ({ page }) => {
    const cardButton = page.getByRole('button');
    await expect(cardButton).toHaveCount(0);
  });
});
