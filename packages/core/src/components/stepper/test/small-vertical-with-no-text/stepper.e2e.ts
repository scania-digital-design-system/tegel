import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/stepper/test/small-vertical-with-no-text/index.html';

//Test if component renders and take a screenshot of the component
test('Stepper - Small vertical with no text', async ({ page }) => {
  await page.goto(componentTestPath);
  const stepper = page.locator('[data-testid="tds-stepper-testid"]');
  await stepper.waitFor({ state: 'visible' });
  await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
});
