import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-header-launcher-grid-title',
  styleUrl: 'header-launcher-grid-title.scss',
  shadow: false,
})
export class HeaderLauncherGridTitle {
  private uuid: string = crypto.randomUUID();

  render() {
    return (
      <Host>
        <h3 class="sdds-header-launcher-grid-title" id={`sdds-${this.uuid}`}>
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
