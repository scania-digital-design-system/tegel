import { E2EPage, test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/modal/test/closable/index.html';
const componentName = 'tds-modal';
const testDescription = 'tds-modal-closable';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    const isClosable = async (page: E2EPage, id: string) => {
      // get modal by id
      const modalComponent = page.getByTestId(id);
      expect(modalComponent).toHaveCount(1);
      // wait for it to show
      await modalComponent.waitFor({ state: 'visible' });
      // get close button within that modal
      const tdsModalCloseButton = modalComponent.locator('.tds-modal-close');
      // expect close button is visible, unless false
      await expect(tdsModalCloseButton).toHaveCount(1);
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    };

    test('x button is visible', async ({ page }) => {
      await isClosable(page, 'tds-modal-testid-0');
    });

    test('x button defaults to true', async ({ page }) => {
      await isClosable(page, 'tds-modal-testid-1');
    });
  });
});
