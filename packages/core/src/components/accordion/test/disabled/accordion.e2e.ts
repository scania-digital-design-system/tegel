import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/disabled/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders disabled accordion correctly', async ({ page }) => {
    // Define selector for accordion
    const accordion = page.locator(accordionSelector);

    // Check if accordion contains the correct text
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    // Check screenshot diff to make sure the accordion is rendered correctly
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('disabled accordion items should be displayed', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.locator(accordionSelector + '>> text=First item');

    // Expect first accordion item to be disabled
    await expect(accordionFirstItem).toBeDisabled();

    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByTestId('second-item');

    // Define selector for second accordion item button since
    // the disabled attribute does not propagate the same when using 'header' slot
    const accordionSecondItemButton = accordionSecondItem.getByRole('button');

    // Expect second accordion item to be disabled
    await expect(accordionSecondItemButton).toBeDisabled();
  });

  test('cursor should be not-allowed on disabled accordion items', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.getByTestId('first-item');
    const accordionFirstItemButton = accordionFirstItem.getByRole('button');

    // Hover first accordion item
    const accordionCursorFirstItem = await accordionFirstItemButton.evaluate(
      (style) => getComputedStyle(style).cursor,
    );

    // Check if selector has "not-allowed" cursor
    await expect(accordionCursorFirstItem).toBe('not-allowed');

    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByTestId('second-item');
    const accordionSecondItemButton = accordionSecondItem.getByRole('button');

    // Hover second accordion item
    const accordionCursorSecondItem = await accordionSecondItemButton.evaluate(
      (style) => getComputedStyle(style).cursor,
    );

    // Check if selector has "not-allowed" cursor
    await expect(accordionCursorSecondItem).toBe('not-allowed');
  });

  test('does not fire tdsToggle event on click on disabled accordion', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.getByText('First item');

    // Click first accordion item
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click({ force: true });

    // Expect event not to be fired
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
