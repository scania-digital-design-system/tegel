import { Component, h, Element, Prop } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the breadcrumb elements.
 */
@Component({
  tag: 'tds-breadcrumbs',
  styleUrl: 'breadcrumbs.scss',
  shadow: true,
})
export class TdsBreadcrumbs {
  @Element() host: HTMLElement;

  /** The value to be used for the aria-label attribute */
  @Prop() tdsAriaLabel: string;

  connectedCallback() {
    if (!this.tdsAriaLabel) {
      console.warn('Tegel Breadcrumbs component: missing tdsAriaLabel prop');
    }
  }

  render() {
    this.host.children[this.host.children.length - 1]?.classList.add('last');

    return (
      <nav aria-label={this.tdsAriaLabel}>
        <div role="list" class="tds-breadcrumb">
          <slot></slot>
        </div>
      </nav>
    );
  }
}
