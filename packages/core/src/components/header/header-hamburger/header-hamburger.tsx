import { Component, Element, h, Host, Prop } from '@stencil/core';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';

@Component({
  tag: 'tds-header-hamburger',
  styleUrl: 'header-hamburger.scss',
  shadow: true,
})
export class TdsHeaderHamburger {
  @Element() host!: HTMLElement;

  /** Value to be used by the aria-label attribute */
  @Prop() tdsAriaLabel?: string;

  render() {
    const inheritedButtonProps = {
      ...inheritAriaAttributes(this.host),
    };

    return (
      <Host>
        <tds-header-item>
          <button {...inheritedButtonProps} aria-label={this.tdsAriaLabel}>
            <tds-icon class="icon" name="burger" size="20px"></tds-icon>
          </button>
        </tds-header-item>
      </Host>
    );
  }
}
