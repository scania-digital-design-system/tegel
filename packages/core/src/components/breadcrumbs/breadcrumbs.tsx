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

  /** Optional label for the breadcrumbs navigation 1 2 3 */
  @Prop() ariaLabelValue: string = 'Breadcrumbs';

  render() {
    this.host.children[this.host.children.length - 1]?.classList.add('last');
    return (
      <nav aria-label={this.ariaLabelValue}>
        <div role="list" class={'tds-breadcrumb'}>
          <slot></slot>
        </div>
      </nav>
    );
  }
}
