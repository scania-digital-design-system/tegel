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

  render() {
    this.host.children[this.host.children.length - 1]?.classList.add('last');

    if (!this.tdsAriaLabel) {
      console.warn(
        'Tegel Breadcrumbs component: please include tdsAriaLabel prop for improved accessibility',
      );
    }

    return (
      <nav aria-label={this.tdsAriaLabel}>
        <div role="list" class="tds-breadcrumb">
          <slot></slot>
        </div>
      </nav>
    );
  }
}
