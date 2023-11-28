import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/basic/index.html';

test.describe('tds-button-basic', () => {
  test('renders basic button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('component receives click event', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('expect button to be of role button', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByRole('button');
    await expect(button).toHaveCount(1);
  });

  test('Text is displayed', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByText('Button', { exact: true });
    await expect(button).toBeVisible();
  });

  test('Check so that height is correct to lg/default measurements', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByText('Button', { exact: true });
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('56px');
  });
});
