import { newSpecPage } from '@stencil/core/testing';
import { Divider } from './divider';

describe('sdds-divider', () => {
  it('renders a horizontal divider by default', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: '<sdds-divider></sdds-divider>',
      supportsShadowDom: true,
    });
    const { root } = page;
    const divElement = root.shadowRoot.querySelector('div');
    expect(divElement).not.toBeNull();
    expect(root.getAttribute('role')).toBe('separator');
    expect(root.getAttribute('aria-orientation')).toBeFalsy();
  });

  it('renders a vertical divider when orientation is set to "vertical"', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: '<sdds-divider orientation="vertical"></sdds-divider>',
      supportsShadowDom: true,
    });
    const { root } = page;
    const divElement = root.shadowRoot.querySelector('div');
    expect(divElement).not.toBeNull();
    expect(root.getAttribute('role')).toBe('separator');
    expect(root.getAttribute('aria-orientation')).toBe('vertical');
  });
});
