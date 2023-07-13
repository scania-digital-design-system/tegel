import { Component, h, Host } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For content.
 */
@Component({
  tag: 'tds-core-header-item',
  styleUrl: 'core-header-item.scss',
  shadow: true,
})
export class TdsCoreHeaderItem {
  render() {
    return (
      <Host>
        <div class="item">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
