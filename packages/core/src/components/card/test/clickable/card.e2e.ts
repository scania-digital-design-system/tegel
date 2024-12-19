import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/card/test/clickable/index.html';
const componentName = 'tds-card';
const testDescription = 'tds-card-clickable';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders clickable card correctly', async ({ page }) => {
      const cardButton = page.getByRole('button');
      await cardButton.hover();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('card should contain a button that is clickable', async ({ page }) => {
      const cardButton = page.getByRole('button');
      await expect(cardButton).toHaveCount(1);
      await expect(cardButton).toBeVisible();

      const myEventSpy = await page.spyOnEvent('click');
      await cardButton.click();
      expect(myEventSpy).toHaveReceivedEvent();
    });
  });
});
