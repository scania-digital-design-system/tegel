import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'sdds-breadcrumb',
  styleUrl: 'sdds-breadcrumb.scss',
  shadow: true,
})
export class SddsBreadcrumb {
  @Element() el: HTMLElement;

  connectedCallback() {
    this.el.children[this.el.children.length - 1].classList.add('last');
  }

  render() {
    return (
      <nav>
        <div role="list" class={'sdds-breadcrumb'}>
          <slot></slot>
        </div>
      </nav>
    );
  }
}
