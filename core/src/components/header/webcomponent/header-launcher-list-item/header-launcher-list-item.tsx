import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-header-launcher-list-item',
  styleUrl: 'header-launcher-list-item.scss',
  shadow: true,
})
export class HeaderLauncherListItem {
  render() {
    return (
      <Host>
        <sdds-header-dropdown-list-item type="lg">
          <slot></slot>
        </sdds-header-dropdown-list-item>
      </Host>
    );
  }
}
