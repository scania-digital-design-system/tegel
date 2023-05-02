import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-side-menu-user',
  styleUrl: 'side-menu-user.scss',
  shadow: true,
})
export class SideMenuUser {
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
        <sdds-side-menu-user-image src={this.imgSrc} alt={this.imgAlt}>
          <slot name="image"></slot>
        </sdds-side-menu-user-image>
        <sdds-side-menu-user-label
          heading={this.heading}
          subheading={this.subheading}
        ></sdds-side-menu-user-label>
      </Host>
    );
  }
}
