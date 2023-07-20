import { Component, h, Host } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link or button element.
 */
@Component({
  tag: 'tds-header-launcher-list-item',
  styleUrl: 'header-launcher-list-item.scss',
  shadow: true,
})
export class TdsHeaderLauncherListItem {
  render() {
    return (
      <Host>
        <tds-header-dropdown-list-item size="lg">
          <slot></slot>
        </tds-header-dropdown-list-item>
      </Host>
    );
  }
}
