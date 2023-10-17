import { Component, h, Element } from '@stencil/core';

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

  render() {
    this.host.children[this.host.children.length - 1]?.classList.add('last');
    return (
      <nav>
        <div role="list" class={'tds-breadcrumb'}>
          <slot></slot>
        </div>
      </nav>
    );
  }
}
