import { Component, Element, h, Host } from '@stencil/core';
import { inheritAriaAttributes } from '../../../utils/utils';

@Component({
  tag: 'tds-header-brand-symbol',
  styleUrl: 'header-brand-symbol.scss',
  shadow: true,
})
export class TdsHeaderBrandSymbol {
  @Element() host: HTMLElement;

  render() {
    const inheritedLinkProps = {
      ...inheritAriaAttributes(this.host),
    };
    return (
      <Host>
        <tds-header-item>
          <slot {...inheritedLinkProps}></slot>
        </tds-header-item>
      </Host>
    );
  }
}
