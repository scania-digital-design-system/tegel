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

    return (
      <Host>
        <tds-side-menu-item
          class={{
            button: true,
          }}
        >
          <a>
            <div role="button" {...buttonProps}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.625 5.25879L14.7412 4.375L10 9.11621L5.25879 4.375L4.375 5.25879L9.11621 10L4.375 14.7412L5.25879 15.625L10 10.8838L14.7412 15.625L15.625 14.7412L10.8838 10L15.625 5.25879Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        </tds-side-menu-item>
      </Host>
    );
  }
}
