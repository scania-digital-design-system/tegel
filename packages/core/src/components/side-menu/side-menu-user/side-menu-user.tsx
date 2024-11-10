import { Component, h, Host, Prop } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> Used as alternative to props to inject <code><img...</code> element directly into the DOM.
 * */

@Component({
  tag: 'tds-side-menu-user',
  styleUrl: 'side-menu-user.scss',
  shadow: true,
})
export class TdsSideMenuUser {
  /** The heading text. */
  @Prop() heading!: string;

  /** The subheading text. */
  @Prop() subheading: string;

  /** The image source. */
  @Prop() imgSrc: string;

  /** The image alt text. */
  @Prop() imgAlt: string;

  render() {
    return (
      <Host>
        <tds-side-menu-user-image class="user-image" src={this.imgSrc} alt={this.imgAlt}>
          <slot name="image"></slot>
        </tds-side-menu-user-image>
        <tds-side-menu-user-label
          heading={this.heading}
          subheading={this.subheading}
        ></tds-side-menu-user-label>
      </Host>
    );
  }
}
