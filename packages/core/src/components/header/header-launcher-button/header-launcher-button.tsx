import { Component, Element, h, Host, Prop } from '@stencil/core';
import { Attributes } from '../../../types/Attributes';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';

@Component({
  tag: 'tds-header-launcher-button',
  styleUrl: 'header-launcher-button.scss',
  shadow: true,
})
export class TdsHeaderLauncherButton {
  @Element() host: HTMLElement;

  /** If the button should appear active. Can be used when the button is
   * triggering a dropdown, and the dropdown is open, for example. */
  @Prop() active = false;

  /** Value to be used by the aria-label attribute */
  @Prop() tdsAriaLabel: string;

  private ariaAttributes: Attributes;

  render() {
    this.ariaAttributes = { ...this.ariaAttributes, ...inheritAriaAttributes(this.host) };
    const buttonProps = {
      ...this.ariaAttributes,
    };

    return (
      <Host>
        <tds-header-item active={this.active}>
          <button {...buttonProps} aria-label={this.tdsAriaLabel}>
            <tds-icon
              class="icon"
              name="bento"
              size="20px"
              svg-title={this.tdsAriaLabel}
            ></tds-icon>
          </button>
        </tds-header-item>
      </Host>
    );
  }
}
