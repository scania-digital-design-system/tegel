import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-popover-menu-item',
  styleUrl: 'popover-menu-item.scss',
  shadow: true,
})
export class TdsPopoverMenuItem {
  render() {
    return (
      <Host>
        <div class="wrapper">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
