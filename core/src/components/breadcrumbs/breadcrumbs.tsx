import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'tds-breadcrumbs',
  styleUrl: 'breadcrumbs.scss',
  shadow: true,
})
export class TdsBreadcrumb {
  @Element() el: HTMLElement;

  connectedCallback() {
    this.el.children[this.el.children.length - 1].classList.add('last');
  }

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
