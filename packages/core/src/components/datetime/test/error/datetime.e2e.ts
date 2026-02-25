import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/datetime/test/error/index.html';
const componentName = 'tds-datetime';
const testDescription = 'tds-datetime-error';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders error helper text in error state with red color and error icon', async ({
      page,
    }) => {
      const helperText = "This is for status='error'";
      const errorText = 'This is the error text!';

      await expect(page.getByText(errorText)).toBeVisible();
      await expect(page.getByText(helperText)).not.toBeVisible();

      const errorIcon = page.getByRole('img', { name: 'error' });
      await expect(errorIcon).toBeVisible();

      const css = config.theme === 'lightmode' ? 'rgb(209, 0, 27)' : 'rgb(234, 72, 81)';

      await expect(page.getByText(errorText)).toHaveCSS('color', css);
    });

    // Running these tests in Docker, the Browser is expecting a date in the format MM/dd/yyyy
    // Running locally with `npx playwright test`, the Browser is expecting a date in the format dd/MM/yyyy
    test('renders the error message when manually inputing an invalid date', async ({ page }) => {
      const helperText = "Please enter a date with format 'MM/dd/yyyy'";
      const specialErrorText = 'This date is invalid';

      await expect(page.getByText(specialErrorText)).not.toBeVisible();
      await expect(page.getByText(helperText)).toBeVisible();

      const datetime = page.getByLabel("DateTime component with type='date'");
      await datetime.click();

      await datetime.pressSequentially('02');
      await datetime.pressSequentially('31');

      await datetime.blur();

      await expect(page.getByText(specialErrorText)).toBeVisible();
      await expect(page.getByText(helperText)).not.toBeVisible();
    });

    test('renders the error message when manually selecting a date outside the min/max boundaries', async ({
      page,
    }) => {
      const errorText = 'Value must be between 10/01/2026 and 31/03/2026';

      const helperText = "Please enter a date with format 'MM/dd/yyyy'";

      await expect(page.getByText(errorText)).not.toBeVisible();
      await expect(page.getByText(helperText)).toBeVisible();

      const datetime = page.getByLabel("DateTime component with type='date'");

      await datetime.click();

      await datetime.pressSequentially('01');
      await datetime.pressSequentially('04');

      await datetime.blur();

      await expect(page.getByText(errorText)).toBeVisible();
      await expect(page.getByText(helperText)).not.toBeVisible();
    });

    test('renders the error message when manually selecting a week outside the min/max boundaries', async ({
      page,
    }) => {
      const errorText = 'Value must be between Week 06, 2026 and Week 10, 2026';
      const helperText = "Please enter a week with format 'Week ww, yyyy'";

      await expect(page.getByText(errorText)).not.toBeVisible();
      await expect(page.getByText(helperText)).toBeVisible();

      const datetime = page.getByLabel("DateTime component with type='week'");
      await datetime.click();

      await datetime.pressSequentially('23');

      await datetime.blur();

      await expect(page.getByText(errorText)).toBeVisible();
      await expect(page.getByText(helperText)).not.toBeVisible();
    });

    test('renders the error message when manually selecting a time outside the min/max boundaries', async ({
      page,
    }) => {
      const errorText = 'Value must be between 08:30 and 17:30';
      const helperText = "Please enter a week with format 'HH:mm'";

      await expect(page.getByText(errorText)).not.toBeVisible();
      await expect(page.getByText(helperText)).toBeVisible();

      const datetime = page.getByLabel("DateTime component with type='time'");
      await datetime.click();

      await datetime.pressSequentially('08');
      await datetime.pressSequentially('14');

      const hour = new Date().toLocaleTimeString();
      if (hour.includes('AM') || hour.includes('PM')) {
        await datetime.pressSequentially('AM');
      }

      await datetime.blur();

      await expect(page.getByText(errorText)).toBeVisible();
      await expect(page.getByText(helperText)).not.toBeVisible();
    });
  });
});
