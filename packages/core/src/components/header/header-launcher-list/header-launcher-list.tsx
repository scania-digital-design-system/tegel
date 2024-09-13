import { Component, Host, Element, h } from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';
import { getPrefixedTagNames } from '../../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> For list items.
 */
@Component({
  tag: 'tds-header-launcher-list',
  shadow: false,
})
export class TdsHeaderLauncherList {
  uuid: string = generateUniqueId();

  @Element() host: HTMLElement;

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
    const DynamicHeaderDropdownList = prefixedTagNames['tds-header-dropdown-list'];
    return (
      <Host>
        <DynamicHeaderDropdownList size="lg">
          <slot></slot>
        </DynamicHeaderDropdownList>
      </Host>
    );
  }
}
