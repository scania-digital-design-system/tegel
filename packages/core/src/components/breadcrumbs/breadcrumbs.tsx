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

  @Prop() ariaLabelValue: string;

  render() {
    this.host.children[this.host.children.length - 1]?.classList.add('last');

    if (!this.ariaLabelValue) {
      console.log(
        'Tegel Breadcrumbs component: please include ariaLabelValue prop for improved accessibility',
      );
    }
    return (
      <nav aria-label={this.ariaLabelValue}>
        <div role="list" class="tds-breadcrumb">
          <slot></slot>
        </div>
      </nav>
    );
  }
}
