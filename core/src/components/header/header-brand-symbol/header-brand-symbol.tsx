import { Component, Element, h, Host, Prop } from '@stencil/core';
import { inheritAriaAttributes } from '../../../utils/utils';

@Component({
  tag: 'tds-header-brand-symbol',
  styleUrl: 'header-brand-symbol.scss',
  shadow: true,
})
export class TdsHeaderBrandSymbol {
  @Element() host: HTMLElement;

  /** The href for the logo link. */
  @Prop() linkHref: string = 'https://www.scania.com';

  render() {
    const inheritedLinkProps = {
      ...inheritAriaAttributes(this.host),
    };
    return (
      <Host>
        <sdds-header-item>
          <a {...inheritedLinkProps} href={this.linkHref}></a>
        </sdds-header-item>
      </Host>
    );
  }
}
