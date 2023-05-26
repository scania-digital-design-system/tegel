import { Component, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'tds-header-launcher-list-title',
  styleUrl: 'header-launcher-list-title.scss',
  shadow: false,
})
export class TdsHeaderLauncherListTitle {
  @Element() host: HTMLElement;

  private uuid: string = crypto.randomUUID();

  render() {
    return (
      <Host>
        <h3 class="tds-header-launcher-list-title" id={`tds-${this.uuid}`}>
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
