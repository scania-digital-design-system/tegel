import { Component, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'sdds-header-launcher-list-title',
  styleUrl: 'header-launcher-list-title.scss',
  shadow: false,
})
export class HeaderLauncherListTitle {
  @Element() host: HTMLElement;

  private uuid: string = crypto.randomUUID();

  render() {
    return (
      <Host>
        <h3 class="sdds-header-launcher-list-title" id={`sdds-${this.uuid}`}>
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
