import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TdsDropdown } from '../dropdown';
import { TdsDropdownOption } from '../dropdown-option/dropdown-option';

const options = [
  {
    value: 'option-1',
    label: 'Option 1',
    disabled: false,
  },
  {
    value: 'option-2',
    label: 'Option 2',
    disabled: false,
  },
  {
    value: 'option-3',
    label: 'Option 3',
    disabled: true,
  },
];

const getTemplate = (defaultValue?: string) => ({
  components: [TdsDropdown, TdsDropdownOption],
  template: () => (
    <tds-dropdown defaultValue={defaultValue}>
      {options.map((option) => (
        <tds-dropdown-option value={option.value} disabled={option.disabled}>
          {option.label}
        </tds-dropdown-option>
      ))}
    </tds-dropdown>
  ),
});
describe('singleselect dropdown', () => {
  it('should render children correctly', async () => {
    const page = await newSpecPage(getTemplate());

    const children = await page.doc.querySelectorAll('tds-dropdown-option');
    expect(children.length).toBe(3);
  });
  it('should set defaultValue correctly', async () => {
    const page = await newSpecPage(getTemplate('option-3'));

    const dropdown = await page.doc.querySelector('tds-dropdown');
    expect(dropdown.getAttribute('value')).toBe('option-3');
    expect(dropdown.getAttribute('value')).not.toBe('option-2');
  });
  it('should set value using setValue() correctly', async () => {
    const page = await newSpecPage(getTemplate('option-3'));

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.setValue('option-1');
    expect(dropdown.getAttribute('value')).toBe('option-1');
    expect(dropdown.getAttribute('value')).not.toBe('option-3');
  });

  it('should remove value using removeValue() correctly', async () => {
    const page = await newSpecPage(getTemplate('option-3'));

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.removeValue('option-3');
    expect(dropdown.getAttribute('value')).toBe('null');
  });
});
