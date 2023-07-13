import { Component, h, Host } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the header title text.
 */
@Component({
  tag: 'tds-header-title',
  styleUrl: 'header-title.scss',
  shadow: true,
})
export class TdsHeaderTitle {
  render() {
    return (
      <Host>
        <div class="component">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
