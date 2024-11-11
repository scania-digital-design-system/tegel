import { Component, Element, h, Host, Prop } from '@stencil/core';
import { Attributes } from '../../../types/Attributes';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';
import { getPrefixedTagNames } from '../../../utils/tagName';

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

  private ariaAttributes: Attributes;

  render() {
    this.ariaAttributes = { ...this.ariaAttributes, ...inheritAriaAttributes(this.host) };
    const buttonProps = {
      ...this.ariaAttributes,
    };

    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <prefixedTagNames.tdsHeaderItem active={this.active}>
          <button {...buttonProps}>
            <prefixedTagNames.tdsIcon class="icon" name="bento" size="20px" />
          </button>
        </prefixedTagNames.tdsHeaderItem>
      </Host>
    );
  }
}
