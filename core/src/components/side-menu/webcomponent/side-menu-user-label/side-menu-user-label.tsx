import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-side-menu-user-label',
  styleUrl: 'side-menu-user-label.scss',
  shadow: true,
})
export class SideMenuUserLabel {
  /** The heading text. */
  @Prop() heading!: string;

  /** The subheading text. */
  @Prop() subheading: string;

  render() {
    return (
      <Host>
        {this.heading}
        {this.subheading && <div class="subheading">{this.subheading}</div>}
      </Host>
    );
  }
}
