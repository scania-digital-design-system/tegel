import { Component, Host, h } from '@stencil/core';
import { generateUniqueId } from '../../../utils/utils';

@Component({
  tag: 'tds-header-launcher-list',
  shadow: false,
})
export class TdsHeaderLauncherList {
  uuid: string = generateUniqueId();

  render() {
    return (
      <Host>
        <tds-header-dropdown-list type="lg">
          <slot></slot>
        </tds-header-dropdown-list>
      </Host>
    );
  }
}
