import { Component, Host, h } from '@stencil/core';
import { generateUniqueId } from '../../../utils/utils';

/**
 * @slot <default> - <b>Unnamed slot.</b> For list items.
 */
@Component({
  tag: 'tds-header-launcher-list',
  shadow: false,
})
export class TdsHeaderLauncherList {
  uuid: string = generateUniqueId();

  render() {
    return (
      <Host>
        <tds-header-dropdown-list size="lg">
          <slot></slot>
        </tds-header-dropdown-list>
      </Host>
    );
  }
}
