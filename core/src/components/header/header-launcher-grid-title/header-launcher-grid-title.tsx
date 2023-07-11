import { Component, h, Host } from '@stencil/core';
import { generateUniqueId } from '../../../utils/utils';

@Component({
  tag: 'tds-header-launcher-grid-title',
  styleUrl: 'header-launcher-grid-title.scss',
  shadow: false,
})
export class TdsHeaderLauncherGridTitle {
  private uuid: string = generateUniqueId();

  render() {
    return (
      <Host>
        <h3
          class="tds-header-launcher-grid-title"
          id={`tds-header-launcher-grid-title-${this.uuid}`}
        >
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
