import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/button/test/basic/index.html';
const componentName = 'tds-button';
const testDescription = 'tds-button-basic';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders basic button correctly', async ({ page }) => {
      const button = page.getByTestId('tds-button-testid');
      await expect(button).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('component receives click event', async ({ page }) => {
    const button = page.getByRole('button');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('expect button to be of role button', async ({ page }) => {
    const button = page.getByRole('button');
    await expect(button).toHaveCount(1);
  });

  test('Text is displayed', async ({ page }) => {
    const button = page.getByText('Button', { exact: true });
    await expect(button).toBeVisible();
  });

  test('Check so that height is correct to lg/default measurements', async ({ page }) => {
    const button = page.getByText('Button', { exact: true });
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('56px');
  });
});
