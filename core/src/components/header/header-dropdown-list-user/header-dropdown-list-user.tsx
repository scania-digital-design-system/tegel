import { Component, h, Prop, Element, Host } from '@stencil/core';

/**
 * @slot thumbnail - Slot for the thumbnail.
 * @slot header - Slot for the header.
 */
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

  /** Header text, usually the users first name and last name. */
  @Prop() header: string;

  /** Subheader text. */
  @Prop() subheader: string;

  @Element() host: HTMLElement;

  render() {
    return (
      <Host role="listitem">
        <div class="user-box">
          {this.imgUrl && <img src={this.imgUrl} alt={this.imgAlt} />}
          <slot name="thumbanil"></slot>
          <div class="user-content">
            <div class="header">
              {this.header}
              <slot name="header"></slot>
            </div>
            <div class="subheader">
              {this.subheader}
              <slot name="subheader"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
