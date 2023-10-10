import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TdsCheckbox } from '../checkbox';

describe('tds-checkbox', () => {
  it('should render with correct default values', async () => {
    const page = await newSpecPage({
      components: [TdsCheckbox],
      template: () => (
        <tds-checkbox checkboxId="my-id" value="checkbox-value">
          <span slot="label">Label</span>
        </tds-checkbox>
      ),
    });

    const checkbox = page.doc.querySelector('tds-checkbox');
    expect(checkbox.checked).toBe(false);
    expect(checkbox.value).toBe('checkbox-value');
    expect(checkbox.querySelector('input').id).toBe('my-id');
  });

  it('should render checked when checked is true', async () => {
    const page = await newSpecPage({
      components: [TdsCheckbox],
      template: () => (
        <tds-checkbox checked>
          <span slot="label">Label</span>
        </tds-checkbox>
      ),
    });

    const checkbox = page.doc.querySelector('tds-checkbox');
    expect(checkbox.querySelector('input').checked).toBe(true);
  });

  it('should render disabled when disabled is true', async () => {
    const page = await newSpecPage({
      components: [TdsCheckbox],
      template: () => (
        <tds-checkbox disabled>
          <span slot="label">Label</span>
        </tds-checkbox>
      ),
    });

    const checkbox = page.doc.querySelector('tds-checkbox');
    expect(checkbox.querySelector('input').disabled).toBe(true);
  });
});
