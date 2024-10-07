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
    const prefixedTagNames = getPrefixedTagNames(this.host);
    const buttonProps = {
      'aria-label': 'Close',
      ...inheritAriaAttributes(this.host),
    };
    return (
      <Host>
        <button {...buttonProps}>
          <prefixedTagNames.tdsIcon name="cross" size="20px"></prefixedTagNames.tdsIcon>
        </button>
      </Host>
    );
  }
}
