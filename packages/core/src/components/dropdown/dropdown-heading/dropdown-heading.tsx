import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the heading text.
 */
@Component({
  tag: 'tds-dropdown-heading',
  styleUrl: 'dropdown-heading.scss',
  shadow: true,
})
export class TdsDropdownHeading {
  /** Heading text for a group of dropdown options. */
  @Prop({ reflect: true }) text?: string;

  render() {
    return (
      <Host aria-hidden="true" role="presentation" tabIndex={-1}>
        <div class="dropdown-heading">{this.text ? this.text : <slot></slot>}</div>
      </Host>
    );
  }
}
