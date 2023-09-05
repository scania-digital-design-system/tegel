import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'tds-popover-menu-item',
  styleUrl: 'popover-menu-item.scss',
  shadow: true,
})
export class TdsPopoverMenuItem {
  /** Disables the Popover Menu Item */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host>
        <div
          class={{
            wrapper: true,
            disabled: this.disabled,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
