import { Component, Element, h, Host } from '@stencil/core';
import { inheritAriaAttributes } from '../../../utils/utils';

@Component({
  tag: 'tds-header-hamburger',
  styleUrl: 'header-hamburger.scss',
  shadow: true,
})
export class TdsHeaderHamburger {
  @Element() host: HTMLElement;

  render() {
    const inheritedButtonProps = {
      ...inheritAriaAttributes(this.host),
    };

    return (
      <Host>
        <tds-header-item>
          <button {...inheritedButtonProps}>
            <tds-icon class="icon" name="burger" size="20px"></tds-icon>
          </button>
        </tds-header-item>
      </Host>
    );
  }
}
