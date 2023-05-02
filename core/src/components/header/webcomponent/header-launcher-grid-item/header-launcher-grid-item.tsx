import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-header-launcher-grid-item',
  styleUrl: 'header-launcher-grid-item.scss',
  shadow: true,
})
export class HeaderLauncherGridItem {
  render() {
    return (
      <Host role="listitem">
        <slot></slot>
      </Host>
    );
  }
}
