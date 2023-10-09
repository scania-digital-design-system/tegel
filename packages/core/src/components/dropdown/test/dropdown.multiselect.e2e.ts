import { newE2EPage } from '@stencil/core/testing';

describe('tds-dropdown multiselect', () => {
  it('should updated value when an option is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <tds-dropdown multiselect>
        <tds-dropdown-option value="option-1">
            Option 1
        </tds-dropdown-option>
        <tds-dropdown-option value="option-2">
            Option 2
        </tds-dropdown-option>
        <tds-dropdown-option value="option-3">
            Option 3
        </tds-dropdown-option>
    </tds-drodpown>
    `);
    const dropdown = await page.find('tds-dropdown');
    expect(dropdown).not.toBeNull();

    await dropdown.click();
    await page.waitForChanges();
    const firstDropdownOption = await page.find('tds-dropdown-option[value="option-1"]');
    await firstDropdownOption.click();
    await page.waitForChanges();

    expect(dropdown.getAttribute('value')).toBe('option-1');

    const secondDropdownOption = await page.find('tds-dropdown-option[value="option-2"]');
    await secondDropdownOption.click();
    await page.waitForChanges();

    expect(dropdown.getAttribute('value')).toBe('option-1,option-2');
  });
});
