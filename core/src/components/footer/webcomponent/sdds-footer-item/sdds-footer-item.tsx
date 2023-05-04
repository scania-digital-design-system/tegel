import { Component, Element, h } from '@stencil/core';
@Component({
  tag: 'sdds-footer-item',
  styleUrl: 'sdds-footer-item.scss',
  shadow: true,
})
export class SddsFooterItem {
  @Element() host: HTMLElement;

  private parentIsTopPart: boolean = false;

  connectedCallback() {
    this.parentIsTopPart = this.host.closest('sdds-footer-group').parentElement.slot === 'top';
  }

  render() {
    return (
      <div role="listitem" class={`${this.parentIsTopPart ? 'top-part-child' : ''}`}>
        <slot></slot>
      </div>
    );
  }
}
