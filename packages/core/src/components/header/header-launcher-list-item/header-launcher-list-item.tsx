import { Component, Element, h, Host } from '@stencil/core';
import { getPrefixedTagNames } from '../../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link or button element.
 */
@Component({
  tag: 'tds-header-launcher-list-item',
  styleUrl: 'header-launcher-list-item.scss',
  shadow: true,
})
export class TdsHeaderLauncherListItem {
  @Element() host: HTMLElement;

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <prefixedTagNames.tdsHeaderDropdownListItem size="lg">
          <slot></slot>
        </prefixedTagNames.tdsHeaderDropdownListItem>
      </Host>
    );
  }
}
