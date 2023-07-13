import { Component, h, Host } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link or button element.
 */
@Component({
  tag: 'tds-header-launcher-grid-item',
  styleUrl: 'header-launcher-grid-item.scss',
  shadow: true,
})
export class TdsHeaderLauncherGridItem {
  render() {
    return (
      <Host role="listitem">
        <slot></slot>
      </Host>
    );
  }
}
