import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/modal/test/default/index.html';
const componentName = 'tds-modal';
const testDescription = 'tds-modal-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders modal correctly', async ({ page }) => {
      const tdsModal = page.getByTestId('tds-modal-testid');
      await expect(tdsModal).toHaveCount(1);
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel('tds-modal-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('modal contains three buttons', async ({ page }) => {
    // Locate the buttons within the modal
    const modalButtons = page.getByRole('button');

    // Assert that there are three buttons
    await expect(modalButtons).toHaveCount(3);
  });

  test('modal contains a header and a body', async ({ page }) => {
    const modalHeader = page.getByText('This is a header', { exact: true });
    const modalBody = page.getByText('Where you can put anything you want!', {
      exact: true,
    });

    // Assert that there are three buttons
    await expect(modalHeader).toBeVisible();
    await expect(modalBody).toBeVisible();
  });
});
