import { Component, h } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the content.
 */
@Component({
  tag: 'tds-block',
  styleUrl: 'block.scss',
  shadow: true,
})
export class TdsBlock {
  render() {
    return (
      <div class="tds-block">
        <slot></slot>
      </div>
    );
  }
}
