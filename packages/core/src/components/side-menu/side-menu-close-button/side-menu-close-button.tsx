import { Component, Element, h, Host } from '@stencil/core';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';

@Component({
  tag: 'tds-side-menu-close-button',
  styleUrl: 'side-menu-close-button.scss',
  shadow: true,
})
export class TdsSideMenuCloseButton {
  @Element() host: HTMLElement;

  render() {
    const buttonProps = {
      'aria-label': 'Close',
      ...inheritAriaAttributes(this.host),
    };
    return (
      <Host>
        <button {...buttonProps}>
          <tds-icon name="cross" size="20px"></tds-icon>
        </button>
      </Host>
    );
  }
}
