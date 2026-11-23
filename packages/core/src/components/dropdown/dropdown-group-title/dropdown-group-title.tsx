import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the group title text.
 */
@Component({
  tag: 'tds-dropdown-group-title',
  styleUrl: 'dropdown-group-title.scss',
  shadow: true,
})
export class TdsDropdownGroupTitle {
  /** Title text for a group of dropdown options. */
  @Prop({ reflect: true }) text?: string;

  render() {
    return (
      <Host aria-hidden="true" role="presentation" tabIndex={-1}>
        <div class="dropdown-group-title">{this.text ? this.text : <slot></slot>}</div>
      </Host>
    );
  }
}
