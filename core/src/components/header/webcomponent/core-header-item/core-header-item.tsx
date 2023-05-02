import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-core-header-item',
  styleUrl: 'core-header-item.scss',
  shadow: true,
})
export class CoreHeaderItem {
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
