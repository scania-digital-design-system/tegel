import { Component, Element, h, Host } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link. When using an <a> tag, use the aria-label attribute for accessibility.
 */
@Component({
  tag: 'tds-header-brand-symbol',
  styleUrl: 'header-brand-symbol.scss',
  shadow: true,
})
export class TdsHeaderBrandSymbol {
  @Element() host: HTMLElement;

  render() {
    const aTag = this.host.querySelector('a');

    if (!aTag?.hasAttribute('aria-label')) {
      console.warn(
        'Tegel Header Brand Symbol component: missing aria-label attribute for <a> tag inside slot',
      );
    }

    return (
      <Host>
        <tds-header-item>
          <slot></slot>
        </tds-header-item>
      </Host>
    );
  }
}
