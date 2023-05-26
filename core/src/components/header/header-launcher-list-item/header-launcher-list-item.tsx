import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tds-header-launcher-list-item',
  styleUrl: 'header-launcher-list-item.scss',
  shadow: true,
})
export class TdsHeaderLauncherListItem {
  render() {
    return (
      <Host>
        <tds-header-dropdown-list-item type="lg">
          <slot></slot>
        </tds-header-dropdown-list-item>
      </Host>
    );
  }
}
