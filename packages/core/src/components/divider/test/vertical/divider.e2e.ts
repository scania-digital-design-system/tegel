import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/divider/test/vertical/index.html';
const componentName = 'tds-divider';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('expect to render a vertical divider', async ({ page }) => {
      // expect height to be greater than width
      const divider = page.getByTestId('divider').locator('div.divider').first();
      const box = await divider.boundingBox();
      expect(box.height).toBeGreaterThan(box.width);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
