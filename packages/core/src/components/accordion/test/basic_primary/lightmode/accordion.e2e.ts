import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/accordion/test/basic_primary/lightmode/index.html';
const accordionSelector = 'tds-accordion';

test.describe.parallel('tds-accordion-primary-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders basic accordion correctly with primary mode variant and lightmode', async ({
    page,
  }) => {
    // Define selector for accordion
    const accordion = page.locator(accordionSelector);

    // Check if accordion contains the correct text
    await expect(accordion).toContainText('First item');
    await expect(accordion).toContainText('Second item');

    // Check screenshot diff to make sure the accordion is rendered correctly
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
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

  test('second accordion item opens on click', async ({ page }) => {
    // Define selector for second accordion item
    const accordionSecondItem = page.getByText('Second item');

    // Hover second accordion item
    await accordionSecondItem.click();

    // Check screenshot diff to make sure the second accordion item is open
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('fires tdsToggle event on click', async ({ page }) => {
    // Define selector for first accordion item
    const accordionFirstItem = page.getByText('First item');

    // Define selector for second accordion item
    await page.goto(componentTestPath);
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
