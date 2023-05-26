import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tds-header-launcher-grid-title',
  styleUrl: 'header-launcher-grid-title.scss',
  shadow: false,
})
export class TdsHeaderLauncherGridTitle {
  private uuid: string = crypto.randomUUID();

  render() {
    return (
      <Host>
        <h3 class="tds-header-launcher-grid-title" id={`tds-${this.uuid}`}>
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
