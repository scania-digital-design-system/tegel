import { Component, Element, h, Host, Prop } from '@stencil/core';
import { getPrefixedTagNames } from '../../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> Used as alternative to props to inject <code><img...</code> element directly into the DOM.
 * */

@Component({
  tag: 'tds-side-menu-user',
  styleUrl: 'side-menu-user.scss',
  shadow: true,
})
export class TdsSideMenuUser {
  @Element() host: HTMLElement;

  /** The heading text. */
  @Prop() heading!: string;

  /** The subheading text. */
  @Prop() subheading: string;

  /** The image source. */
  @Prop() imgSrc: string;

  /** The image alt text. */
  @Prop() imgAlt: string;

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <prefixedTagNames.tdsSideMenuUserImage
          class="user-image"
          src={this.imgSrc}
          alt={this.imgAlt}
        >
          <slot name="image"></slot>
        </prefixedTagNames.tdsSideMenuUserImage>
        <prefixedTagNames.tdsSideMenuUserLabel
          heading={this.heading}
          subheading={this.subheading}
        ></prefixedTagNames.tdsSideMenuUserLabel>
      </Host>
    );
  }
}
