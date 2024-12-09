import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const colorModes = ['lightmode', 'darkmode'];
const bannerTypes = ['default', 'error', 'information'];

colorModes.forEach((colorMode) => {
  bannerTypes.forEach((bannerType) => {
    const componentTestPath = 'src/components/banner/test/_screenshot_tests/index.html';

    test.describe.parallel(`tds-banner-${bannerType}-${colorMode}`, () => {
      test(`renders ${bannerType} banner with ${colorMode} correctly`, async ({ page }) => {
        await page.goto(componentTestPath);

        if (colorMode === 'darkmode') {
          await page.evaluate(() => {
            document.body.classList.add('tds-mode-dark');
          });
        }

        await page.evaluate((mode) => {
          document.body.setAttribute(
            'style',
            `background-color: ${mode === 'lightmode' ? 'white' : 'grey-958'}; padding: 10px`,
          );
        }, colorMode);

        if (bannerType !== 'default') {
          await page.evaluate((type) => {
            document.getElementsByTagName('tds-banner')[0].setAttribute('variant', type);
          }, bannerType);
        }

        /* Check diff on screenshot */
        await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
      });
    });
  });
});
