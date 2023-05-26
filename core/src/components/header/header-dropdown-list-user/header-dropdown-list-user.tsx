import { Component, h, Prop, Element, Host } from '@stencil/core';

@Component({
  tag: 'tds-header-dropdown-list-user',
  styleUrl: 'header-dropdown-list-user.scss',
  shadow: true,
})
export class TdsHeaderDropdownListLgUser {
  /** Image URL. */
  @Prop() imgUrl: string;

  /** Image alt text. */
  @Prop() imgAlt: string;

  /** Heading, usually the users first name and last name. */
  @Prop() heading: string;

  /** Subheading. */
  @Prop() subheading: string;

  @Element() host: HTMLElement;

  render() {
    return (
      <Host role="listitem">
        <div class="user-box">
          {this.imgUrl && <img src={this.imgUrl} alt={this.imgAlt} />}
          <slot name="image"></slot>
          <div class="user-content">
            <div class="header">
              {this.heading}
              <slot name="heading"></slot>
            </div>
            <div class="subheader">
              {this.subheading}
              <slot name="subheading"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
