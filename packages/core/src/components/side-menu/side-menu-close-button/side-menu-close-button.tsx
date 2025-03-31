import { Component, Element, h, Host } from '@stencil/core';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';

@Component({
  tag: 'tds-side-menu-close-button',
  styleUrl: 'side-menu-close-button.scss',
  shadow: true,
})
export class TdsSideMenuCloseButton {
  @Element() host: HTMLElement;

  private static handleClick() {
    const hamburgerButton = document.querySelector('tds-header-hamburger');
    if (hamburgerButton) {
      hamburgerButton.setAttribute('aria-expanded', 'false');
    }
  }

  render() {
    const buttonProps = {
      'aria-label': 'Close',
      ...inheritAriaAttributes(this.host),
      'onClick': TdsSideMenuCloseButton.handleClick,
    };
    return (
      <Host>
        <button {...buttonProps}>
          <tds-icon name="cross" size="20px" svgTitle="Cross"></tds-icon>
        </button>
      </Host>
    );
  }
}
