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
  @Element() host!: HTMLElement;

  /** Disables the Link */
  @Prop() disabled: boolean = false;

  /** Displays the Link with an underline. */
  @Prop() underline: boolean = true;

  /** Displays the Link as a standalone component. Not part of a paragraph. */
  @Prop() standalone: boolean = false;

  connectedCallback() {
    const links = this.host.querySelectorAll('a');
    if (links.length > 1) {
      console.warn('tds-link is only intended to wrap one <a> tag');
    }
    const link = links[0];
    if (link) {
      if (this.disabled) {
        link.setAttribute('tabindex', '-1');
        link.setAttribute('aria-disabled', 'true');
      } else {
        link.removeAttribute('tabindex');
        link.removeAttribute('aria-disabled');
      }
    }
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
