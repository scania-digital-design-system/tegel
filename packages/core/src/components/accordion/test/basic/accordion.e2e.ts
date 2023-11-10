import { test } from 'stencil-playwright';
import { customTest } from '../../../../utils/html-test-helper'; // Import the customTest function

customTest(
  'tds-accordion',
  'accordion',
  `
  <tds-accordion-item header="First item">
    This is the panel, which contains associated information with the header. Usually it contains
    text, set in the same size as the header. Lorem ipsum doler sit amet.
  </tds-accordion-item>
  <tds-accordion-item>
    <div slot="header">Second item</div>
    This is the panel, which contains associated information with the header. Usually it contains
    text, set in the same size as the header. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Duis laoreet vestibulum fermentum.
  </tds-accordion-item>
`,
  (expect) => {
    // Define your test cases using the provided expect function
    test('renders basic accordion correctly', async ({ page }) => {
      const accordion = page.locator('tds-accordion');
      await expect(accordion).toHaveClass(/hydrated/);
      await expect(accordion).toContainText('First item');
      await expect(accordion).toContainText('Second item');

      await expect(page).toHaveScreenshot({ maxDiffPixels: 20 });
    });

    test('fires tdsToggle event on click', async ({ page }) => {
      const accordionFirstItem = page.locator('tds-accordion-item[header="First item"]');
      const myEventSpy = await page.spyOnEvent('tdsToggle');
      await accordionFirstItem.click();
      expect(myEventSpy).toHaveReceivedEvent();
    });
  },
);
