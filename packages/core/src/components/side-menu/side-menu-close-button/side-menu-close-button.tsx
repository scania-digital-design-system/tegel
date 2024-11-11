import { Component, Element, h, Host } from '@stencil/core';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';
import { getPrefixedTagNames } from '../../../utils/tagName';

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
    const prefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <button {...buttonProps}>
          <prefixedTagNames.tdsIcon name="cross" size="20px" />
        </button>
      </Host>
    );
  }
}
