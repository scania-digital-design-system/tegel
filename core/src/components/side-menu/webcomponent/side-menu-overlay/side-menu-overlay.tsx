import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-side-menu-overlay',
  styleUrl: 'side-menu-overlay.scss',
  shadow: true,
})
export class SideMenuOverlay {
  render() {
    return (
      <Host>
        <div></div>
      </Host>
    );
  }
}
