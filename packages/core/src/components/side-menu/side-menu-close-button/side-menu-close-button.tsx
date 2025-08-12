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
    // Find the closest side menu to this close button
    const sideMenuEl = this.host.closest('tds-side-menu');
    const sideMenuId = sideMenuEl ? sideMenuEl.id : '';

    const buttonProps = {
      'aria-label': 'Close',
      ...(sideMenuId && { 'aria-controls': sideMenuId }),
      ...inheritAriaAttributes(this.host),
      'onClick': TdsSideMenuCloseButton.handleClick,
    };

    console.log(buttonProps);

    return (
      <Host>
        <tds-side-menu-item
          class={{
            button: true,
          }}
        >
          <a>
            {/* <button {...buttonProps}> */}
            <div role="button" {...buttonProps}>
              <tds-icon name="cross" svgTitle="Cross"></tds-icon>
            </div>
            {/* </button> */}
          </a>
        </tds-side-menu-item>
      </Host>
    );
  }
}
