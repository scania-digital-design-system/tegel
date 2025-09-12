import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root of component test folders
const testsRoot = __dirname; // packages/tegel-light/tests

// Find component folders that contain an index.html
const components = fs
  .readdirSync(testsRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name)
  .filter((name) => fs.existsSync(path.join(testsRoot, name, 'index.html')));


for (const name of components) {
  const pagePath = `tests/${name}/index.html`;

  test.describe(`${name}`, () => {

    // Scania light & dark
    test('Should render Scania light mode', async ({ page }) => {
      await page.goto(pagePath);
      await page.evaluate(() => {
        document.documentElement.className = 'scania';
        document.body.className = 'tds-mode-light';
      });
      await page.waitForTimeout(50);
      await expect(page).toHaveScreenshot(name);
    });

    test('Should render Scania dark mode', async ({ page }) => {
      await page.goto(pagePath);
      await page.evaluate(() => {
        document.documentElement.className = 'scania';
        document.body.className = 'tds-mode-dark';
      });
      await page.waitForTimeout(50);
      await expect(page).toHaveScreenshot(name);
    });

    // Traton light & dark
    test('Should render Traton light mode', async ({ page }) => {
      await page.goto(pagePath);
      await page.evaluate(() => {
        document.documentElement.className = 'traton';
        document.body.className = 'tds-mode-light';
      });
      await page.waitForTimeout(50);
      await expect(page).toHaveScreenshot(name);
    });

    test('Should render Traton dark mode', async ({ page }) => {
      await page.goto(pagePath);
      await page.evaluate(() => {
        document.documentElement.className = 'traton';
        document.body.className = 'tds-mode-dark';
      });
      await page.waitForTimeout(50);
      await expect(page).toHaveScreenshot(name);
    });
  });
}
