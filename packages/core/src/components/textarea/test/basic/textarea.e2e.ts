import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/textarea/test/basic/index.html';
const componentName = 'tds-textarea';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default textarea correctly', async ({ page }) => {
      const tdsTextarea = page.getByTestId('tds-textarea-testid');
      await expect(tdsTextarea).toHaveCount(1);

      /* Expect no difference in screenshot  */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('test if able to type in textarea', async ({ page }) => {
      const textarea = page.getByRole('textbox');

      /* Expect to have received an event from clicking on the textarea */
      const myEventSpy = await page.spyOnEvent('click');
      await textarea.click();
      expect(myEventSpy).toHaveReceivedEvent();

      /* Expect the textbox to have the cursor text style */
      const textareaCursorState = await textarea.evaluate(
        (style) => getComputedStyle(style).cursor,
      );
      expect(textareaCursorState).toBe('text');

      /* Expect the inputValue of textarea to have "Adding some text" after it has been typed */
      await textarea.fill('Adding some text');
      expect(await textarea.inputValue()).toBe('Adding some text');
    });
  });
});
