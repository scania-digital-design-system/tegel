import { Component, h, Host, Element } from '@stencil/core';
import { inheritAriaAttributes, updateListChildrenRoles } from '../../utils/utils';

@Component({
  tag: 'tds-header',
  styleUrl: 'header.scss',
  shadow: false,
})
export class TdsHeader {
  @Element() host: HTMLElement;

  private observer: MutationObserver;

  constructor() {
    const callback: MutationCallback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          updateListChildrenRoles(mutation.target);
        }
      });
    };

    this.observer = new MutationObserver(callback);
  }

  componentDidLoad() {
    const hostElement = this.host;
    const navElement = hostElement.querySelector('.tds-header-component-list');

    this.observer.observe(navElement, {
      childList: true,
      subtree: false,
    });

    updateListChildrenRoles(navElement);
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  render() {
    const navAttributes = {
      ...inheritAriaAttributes(this.host),
    };

    return (
      <Host>
        <slot name="hamburger"></slot>
        <slot name="title"></slot>
        <nav {...navAttributes}>
          <ul class="tds-header-component-list">
            <slot></slot>
            <li class="tds-header-middle-spacer"></li>
            <slot name="end"></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
