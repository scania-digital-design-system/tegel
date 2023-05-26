import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-header-launcher-list',
  shadow: false,
})
export class TdsHeaderLauncherList {
  uuid: string = crypto.randomUUID();

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
