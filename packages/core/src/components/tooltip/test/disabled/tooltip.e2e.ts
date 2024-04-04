import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/tooltip/test/disabled/index.html';

test.describe('tds-tooltip', () => {
  test('renders the tooltip correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('tooltip closes when cursor is removed from the button', async ({ page }) => {
    await page.goto(componentTestPath);

    // Assuming your button and tooltip setup is already appropriate for this test
    const button = page.locator('tds-button#button-2');

    // Hover over the button to show the tooltip
    await button.hover();
    // Assuming you can uniquely identify the tooltip that should be visible on hover
    const tooltip = page.locator('text=Text inside Tooltip');

    await expect(tooltip).toBeVisible();
    // Make sure tooltip is visible first
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.5 });

    const buttonBox = await button.boundingBox();
    // Move the mouse to a position slightly outside the button's bounding box
    await page.mouse.move(buttonBox.x + buttonBox.width + 10, buttonBox.y + buttonBox.height + 10);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Verify the tooltip is no longer visible
    await expect(tooltip).toBeHidden({ timeout: 3000 });
  });
});
