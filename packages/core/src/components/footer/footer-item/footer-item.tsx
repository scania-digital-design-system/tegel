import { Component, Element, h } from '@stencil/core';
import { findClosestComponent } from '../../../utils/findClosestComponent';

/**
 * @slot <default> - <b>Unnamed slot.</b> For slotting a link, button, or similar.
 */
@Component({
  tag: 'tds-footer-item',
  styleUrl: 'footer-item.scss',
  shadow: true,
})
export class TdsFooterItem {
  @Element() host: HTMLElement;

  private parentIsTopPart: boolean = false;

  connectedCallback() {
    this.parentIsTopPart =
      (findClosestComponent(this.host, 'tdsFooterGroup') as HTMLTdsFooterGroupElement).parentElement
        .slot === 'top';
  }

  render() {
    return (
      <div role="listitem" class={`${this.parentIsTopPart ? 'top-part-child' : ''}`}>
        <slot></slot>
      </div>
    );
  }
}
