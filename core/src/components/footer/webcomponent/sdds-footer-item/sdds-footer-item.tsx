import { Component, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';

@Component({
  tag: 'sdds-footer-item',
  styleUrl: 'sdds-footer-item.scss',
  shadow: true,
})
export class SddsFooterItem {
  @Element() host: HostElement;

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
