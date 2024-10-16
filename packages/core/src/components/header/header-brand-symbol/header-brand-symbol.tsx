import { Component, Element, h, Host } from '@stencil/core';
import { getPrefixedTagNames } from '../../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link.
 */
@Component({
  tag: 'tds-header-brand-symbol',
  styleUrl: 'header-brand-symbol.scss',
  shadow: true,
})
export class TdsHeaderBrandSymbol {
  @Element() host: HTMLElement;

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <prefixedTagNames.tdsHeaderItem>
          <slot></slot>
        </prefixedTagNames.tdsHeaderItem>
      </Host>
    );
  }
}
