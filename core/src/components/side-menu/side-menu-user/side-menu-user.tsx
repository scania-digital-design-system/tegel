import { Component, h, Host, Prop } from '@stencil/core';

/**
 * @slot image - Used as alternative to imgSrc and imgAlt props. Offers injecting <code>HTML</code> directly into a component.
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
        <tds-side-menu-user-image src={this.imgSrc} alt={this.imgAlt}>
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
