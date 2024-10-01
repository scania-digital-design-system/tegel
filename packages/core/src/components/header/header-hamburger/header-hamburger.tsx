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

    const inheritedButtonProps = {
      ...inheritAriaAttributes(this.host),
    };

    return (
      <Host>
        <prefixedTagNames.tdsHeaderItem>
          <button {...inheritedButtonProps}>
            <prefixedTagNames.tdsIcon
              class="icon"
              name="burger"
              size="20px"
            ></prefixedTagNames.tdsIcon>
          </button>
        </prefixedTagNames.tdsHeaderItem>
      </Host>
    );
  }
}
