import { Component, h, Host, Prop } from '@stencil/core';

// TODO this component is just for the dropdown detecting that it should
// change layout
@Component({
  tag: 'sdds-side-menu-user-image',
  styleUrl: 'side-menu-user-image.scss',
  shadow: true,
})
export class SideMenuUserImage {
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
