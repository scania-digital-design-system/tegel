import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TdsDropdown } from './dropdown';
import { TdsDropdownOption } from './dropdown-option/dropdown-option';

describe('singleselect dropdown', () => {
  it('should render children correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown>
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const children = await page.doc.querySelectorAll('tds-dropdown-option');
    expect(children.length).toBe(3);
  });
  it('should set defaultValue correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    expect(dropdown.getAttribute('value')).toBe('option-3');
    expect(dropdown.getAttribute('value')).not.toBe('option-2');
  });
  it('should set value using setValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.setValue('option-1');
    expect(dropdown.getAttribute('value')).toBe('option-1');
    expect(dropdown.getAttribute('value')).not.toBe('option-3');
  });

  it('should remove value using removeValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.removeValue('option-3');
    expect(dropdown.getAttribute('value')).toBe('null');
  });
});
describe('multiselect dropdown', () => {
  it('should render children correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown multiselect>
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const children = await page.doc.querySelectorAll('tds-dropdown-option');
    expect(children.length).toBe(3);
  });
  it('should set defaultValue correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown multiselect defaultValue="option-1,option-2">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    expect(dropdown.getAttribute('value')).toBe('option-1,option-2');
  });
  it('should set value using setValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown multiselect defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.setValue(['option-1', 'option-3']);
    expect(dropdown.getAttribute('value')).toBe('option-1,option-3');
  });

  it('should remove value using removeValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown multiselect defaultValue="option-3,option-1">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.removeValue('option-3');
    expect(dropdown.getAttribute('value')).toBe('option-1');
    await dropdown.removeValue('option-1');
    expect(dropdown.getAttribute('value')).toBe('null');
  });
});

describe('filter dropdown', () => {
  it('should render children correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown filter>
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const children = await page.doc.querySelectorAll('tds-dropdown-option');
    expect(children.length).toBe(3);
  });
  it('should set defaultValue correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown filter defaultValue="option-1">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    expect(dropdown.getAttribute('value')).toBe('option-1');
  });
  it('should set value using setValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown filter defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.setValue('option-1');
    expect(dropdown.getAttribute('value')).toBe('option-1');
  });

  it('should remove value using removeValue() correctly', async () => {
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
    const page = await newSpecPage({
      components: [TdsDropdown, TdsDropdownOption],
      template: () => (
        <tds-dropdown filter defaultValue="option-3">
          {options.map((option) => (
            <tds-dropdown-option value={option.value} disabled={option.disabled}>
              {option.label}
            </tds-dropdown-option>
          ))}
        </tds-dropdown>
      ),
    });

    const dropdown = await page.doc.querySelector('tds-dropdown');
    await dropdown.removeValue('option-3');
    expect(dropdown.getAttribute('value')).toBe('null');
  });
});
