import { Component, h, Prop, Element } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link element. Eg. <code>&lt;a><a></code>.
 */
@Component({
  tag: 'tds-link',
  styleUrl: 'link.scss',
  shadow: true,
})
export class TdsLink {
  @Element() host: HTMLElement;

  /** Disables the Link */
  @Prop() disabled: boolean = false;

  /** Displays the Link with an underline. */
  @Prop() underline: boolean = true;

  /** Displays the Link as a standalone component. Not part of a paragraph. */
  @Prop() standalone: boolean = false;

  connectedCallback() {
    this.host.children[0].classList.add('tds-link-component');
  }

  render() {
    return (
      <span
        class={{
          'disabled': this.disabled,
          'no-underline': !this.underline,
          'standalone': this.standalone,
        }}
      >
        <slot></slot>
      </span>
    );
  }
}
