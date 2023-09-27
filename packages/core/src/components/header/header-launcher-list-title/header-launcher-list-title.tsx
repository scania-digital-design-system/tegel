import { Component, Element, h, Host } from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the title text.
 */
@Component({
  tag: 'tds-header-launcher-list-title',
  styleUrl: 'header-launcher-list-title.scss',
  shadow: false,
})
export class TdsHeaderLauncherListTitle {
  @Element() host: HTMLElement;

  private uuid: string = generateUniqueId();

  render() {
    return (
      <Host>
        <h3 class="tds-header-launcher-list-title" id={`tds-header-launcher-${this.uuid}`}>
          <slot></slot>
        </h3>
      </Host>
    );
  }
}
