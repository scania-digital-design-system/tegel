import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/breadcrumbs/test/default/index.html';
const componentName = 'tds-breadcrumbs';
const testDescription = 'tds-breadcrumbs-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default breadcrumbs correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('page 3 item should be able to become focused', async ({ page }) => {
      const pageThree = page.getByText(/Page 3/);
      await pageThree.focus();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('items Page 1, Page 2, Page 3 exist on the page', async ({ page }) => {
    const navigation = page.getByRole('navigation');
    await expect(navigation).toHaveCount(1);
    const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveCount(3);
    const pageOne = page.getByRole('link').filter({ hasText: 'Page 1' });
    const pageTwo = page.getByRole('link').filter({ hasText: 'Page 2' });
    const pageThree = page.getByRole('link').filter({ hasText: 'Page 3' });

    await expect(pageOne).toHaveCount(1);
    await expect(pageOne).toBeVisible();

    await expect(pageTwo).toHaveCount(1);
    await expect(pageTwo).toBeVisible();

    await expect(pageThree).toHaveCount(1);
    await expect(pageThree).toBeVisible();
  });
});
