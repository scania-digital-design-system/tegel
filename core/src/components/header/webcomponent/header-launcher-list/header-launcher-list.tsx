import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sdds-header-launcher-list',
  shadow: false,
})
export class HeaderLauncherList {
  uuid: string = crypto.randomUUID();

  render() {
    return (
      <Host>
        <sdds-header-dropdown-list type="lg">
          <slot></slot>
        </sdds-header-dropdown-list>
      </Host>
    );
  }
}
