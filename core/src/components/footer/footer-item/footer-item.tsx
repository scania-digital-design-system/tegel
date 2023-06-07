import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'tds-footer-item',
  styleUrl: 'footer-item.scss',
  shadow: true,
})
export class TdsFooterItem {
  @Element() host: HTMLElement;

  private parentIsTopPart: boolean = false;

  connectedCallback() {
    this.parentIsTopPart = this.host.closest('tds-footer-group').parentElement.slot === 'top';
  }

  render() {
    return (
      <div role="listitem" class={`${this.parentIsTopPart ? 'top-part-child' : ''}`}>
        <slot></slot>
      </div>
    );
  }
}
