import { Component, Element, h, Host } from '@stencil/core';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';
import { getPrefixedTagNames } from '../../../utils/tagName';

@Component({
  tag: 'tds-header-hamburger',
  styleUrl: 'header-hamburger.scss',
  shadow: true,
})
export class TdsHeaderHamburger {
  @Element() host: HTMLElement;

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
    const DynamicHeaderItem = prefixedTagNames['tds-header-item'];

    const inheritedButtonProps = {
      ...inheritAriaAttributes(this.host),
    };

    return (
      <Host>
        <DynamicHeaderItem>
          <button {...inheritedButtonProps}>
            <tds-icon class="icon" name="burger" size="20px"></tds-icon>
          </button>
        </DynamicHeaderItem>
      </Host>
    );
  }
}
