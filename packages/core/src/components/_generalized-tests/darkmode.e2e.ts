import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Components to test
// name is the name of the directory for the component
// baseOnTest is the name of the directory containing the index.html that we base this test on (and just add the dark mode class to the body element)
const components = [
  { name: 'accordion', baseOnTest: 'basic' },
  { name: 'badge', baseOnTest: 'basic' },
  { name: 'banner', baseOnTest: 'default' },
  { name: 'block', baseOnTest: '2-level-light-mode' },
  { name: 'breadcrumbs', baseOnTest: 'default' },
  { name: 'button', baseOnTest: 'basic' },
  { name: 'card', baseOnTest: 'default' },
  { name: 'checkbox', baseOnTest: 'default' },
  { name: 'chip', baseOnTest: 'default' },
  { name: 'datetime', baseOnTest: 'default' },
  { name: 'divider', baseOnTest: 'horizontal' },
  { name: 'dropdown', baseOnTest: 'default' },
  { name: 'footer', baseOnTest: 'default' },
  { name: 'header', baseOnTest: 'default' },
  { name: 'icon', baseOnTest: undefined }, // has no tests
  { name: 'message', baseOnTest: 'basic' },
  { name: 'modal', baseOnTest: 'default' },
  { name: 'popover-canvas', baseOnTest: 'default' },
  { name: 'popover-core', baseOnTest: undefined }, // has no tests
  { name: 'popover-menu', baseOnTest: 'default' },
  { name: 'radio-button', baseOnTest: 'default' },
  { name: 'side-menu', baseOnTest: 'default' },
  { name: 'slider', baseOnTest: 'default' },
  { name: 'spinner', baseOnTest: 'standard' },
  { name: 'stepper', baseOnTest: 'large-horizontal-text-below' },
  { name: 'table/table', baseOnTest: 'default' },
  { name: 'text-field', baseOnTest: 'default' },
  { name: 'textarea', baseOnTest: 'default' },
  { name: 'toast', baseOnTest: 'information' },
  { name: 'toggle', baseOnTest: 'default' },
  { name: 'tooltip', baseOnTest: 'default' },
];

components.forEach((component) => {
  if (!component.baseOnTest) {
    return;
  }

  test.describe.parallel(`${component.name}`, () => {
    test(`testing ${component.name} ${component.baseOnTest} darkmode`, async ({ page }) => {
      const componentTestPath = `src/components/${component.name}/test/${component.baseOnTest}/index.html`;
      await page.goto(componentTestPath);

      // Add dark mode class
      await page.evaluate(() => {
        document.body.classList.add('tds-mode-dark');
      });

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
