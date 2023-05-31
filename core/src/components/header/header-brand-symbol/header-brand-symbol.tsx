import { Component, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'tds-header-brand-symbol',
  styleUrl: 'header-brand-symbol.scss',
  shadow: true,
})
export class TdsHeaderBrandSymbol {
  @Element() host: HTMLElement;

  render() {
    return (
      <Host>
        <tds-header-item>
          <slot></slot>
        </tds-header-item>
      </Host>
    );
  }
}
