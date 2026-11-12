import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a native <code>&lt;a></code> element.
 */
@Component({
  tag: 'tds-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class TdsBreadcrumb {
  @Element() host!: HTMLElement;

  /** Boolean for the current link */
  @Prop({ reflect: true }) current: boolean = false;

  componentDidLoad() {
    this.syncCurrentLink();
  }

  @Watch('current')
  currentChanged() {
    this.syncCurrentLink();
  }

  private syncCurrentLink() {
    const slot = this.host.shadowRoot?.querySelector('slot');
    const link = slot?.assignedElements().find((element) => element.tagName === 'A') as
      HTMLAnchorElement | undefined;

    if (this.current) {
      link?.setAttribute('aria-current', 'page');
    } else {
      link?.removeAttribute('aria-current');
    }
  }

  render() {
    return (
      <Host role="listitem">
        <slot onSlotchange={() => this.syncCurrentLink()} />
      </Host>
    );
  }
}
