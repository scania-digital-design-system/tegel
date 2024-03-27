import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/chip/test/default/index.html';

test.describe.parallel('tds-chip-default', () => {
  test('renders default chip correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const chip = page.locator('tds-chip');
    await expect(chip).toHaveCount(1);

    const labelElement = page.locator('tds-chip label'); // Target label underneath chip
    expect(labelElement).toHaveText('Label');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('expect chip to be of the role button', async ({ page }) => {
    await page.goto(componentTestPath);
    const chipRole = page.getByRole('button');
    await expect(chipRole).toHaveCount(1);
  });

  test('Check so that height is correct to lg/default measurements', async ({ page }) => {
    await page.goto(componentTestPath);
    const chip = page.locator('tds-chip label');
    const chipHeight = await chip.evaluate((style) => getComputedStyle(style).height);
    expect(chipHeight).toBe('32px');
  });

  test('Chip is clickable', async ({ page }) => {
    await page.goto(componentTestPath);
    const chip = page.locator('tds-chip label');
    chip.hover();
    const chipCursorStyle = await chip.evaluate((style) => getComputedStyle(style).cursor);
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
