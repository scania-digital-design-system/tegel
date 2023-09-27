import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tds-side-menu-overlay',
  styleUrl: 'side-menu-overlay.scss',
  shadow: true,
})
export class TdsSideMenuOverlay {
  render() {
    return (
      <Host>
        <div></div>
      </Host>
    );
  }
}
