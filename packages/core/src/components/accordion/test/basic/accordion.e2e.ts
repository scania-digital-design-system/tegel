import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  getTestDescribeText,
  setupPage,
  testConfigurations,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/accordion/test/basic/index.html';
const accordionSelector = 'tds-accordion';
const componentName = 'tds-accordion';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders basic accordion correctly', async ({ page }) => {
      // Define selector for accordion
      const accordion = page.locator(accordionSelector);

      // Check if accordion contains the correct text
      await expect(accordion).toContainText('First item');
      await expect(accordion).toContainText('Second item');

      // Check screenshot diff to make sure the accordion is rendered correctly
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('second accordion item opens on click', async ({ page }) => {
      // Define selector for second accordion item
      const accordionSecondItem = page.getByText('Second item');

      // Hover second accordion item
      await accordionSecondItem.click();

      // Check screenshot diff to make sure the second accordion item is open
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('should handle hover on accordion items', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.getByText('First item');

    // Hover first accordion item
    await accordionFirstItem.hover();

    // Expect cursor to be pointer
    await expect(accordionFirstItem).toHaveCSS('cursor', 'pointer');

    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByText('Second item');

    // Hover second accordion item
    await accordionSecondItem.hover();

    // Expect cursor to be pointer
    await expect(accordionSecondItem).toHaveCSS('cursor', 'pointer');
  });

  test('fires tdsToggle event on click', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.getByText('First item');

    // Define selector for second accordion item
    const accordionSecondItem = page.getByText('Second item');

    // Click first accordion item
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click();

    // Expect event to be fired
    expect(myEventSpy).toHaveReceivedEvent();

    // Click second accordion item
    await accordionSecondItem.click();

    // Expect event to be fired
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
