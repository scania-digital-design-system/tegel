import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/disabled/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion', () => {
  test('renders disabled accordion correctly', async ({ page }) => {
    // Define selector for accordion
    await page.goto(componentTestPath);
    const accordion = page.locator(accordionSelector);

    // Check if accordion contains the correct text
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    // Check screenshot diff to make sure the accordion is rendered correctly
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('disabled accordion items should be displayed', async ({ page }) => {
    // Define selector for first accordion item
    await page.goto(componentTestPath);
    const accordionFirstItem = page.locator(accordionSelector + '>> text=First item');

    // Expect first accordion item to be disabled
    await expect(accordionFirstItem).toBeDisabled();

    // Define selector for second accordion item
    await page.goto(componentTestPath);
    const accordionSecondItem = page.getByTestId('second-item');

    // Expect second accordion item to be disabled
    await expect(accordionSecondItem).toHaveAttribute('disabled', '');
  });

  test('does not fire tdsToggle event on click on disabled accordion', async ({ page }) => {
    // Define selector for first accordion item
    await page.goto(componentTestPath);
    const accordionFirstItem = page.getByText('First item');

    // Click first accordion item
    const myEventSpy = await page.spyOnEvent('tdsToggle');
    await accordionFirstItem.click({ force: true });

    // Expect event not to be fired
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
