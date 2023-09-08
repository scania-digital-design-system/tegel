import { Component, h, Host, Prop } from '@stencil/core';

// TODO this component is just for the dropdown detecting that it should
// change layout
// FIXME: Can the logic for it be directly integrated in side-menu-user instead?

/**
 * @slot <default> - <b>Unnamed slot.</b> Used as alternative to props to inject <code><img...</code> element directly into the DOM.
 */

@Component({
  tag: 'tds-side-menu-user-image',
  styleUrl: 'side-menu-user-image.scss',
  shadow: true,
})
export class TdsSideMenuUserImage {
  /** The image source. */
  @Prop() src: string;

  /** The image alt text. */
  @Prop() alt: string;

  render() {
    return (
      <Host>
        <slot></slot>
        {this.src && <img src={this.src} alt={this.alt} />}
      </Host>
    );
  }
}
