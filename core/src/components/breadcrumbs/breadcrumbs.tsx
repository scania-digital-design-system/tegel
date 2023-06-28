import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'tds-breadcrumbs',
  styleUrl: 'breadcrumbs.scss',
  shadow: true,
})
export class TdsBreadcrumbs {
  @Element() el: HTMLElement;

  render() {
    return (
      <nav>
        <div role="list" class={'tds-breadcrumb'}>
          <slot></slot>
        </div>
      </nav>
    );
  }
}
