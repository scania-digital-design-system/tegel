import { Component, h, Host, Element } from '@stencil/core';
import updateListChildrenRoles from '../../utils/updateListChildrenRoles';
import inheritAriaAttributes from '../../utils/inheritAriaAttributes';

/**
 * @slot <default> - <b>Unnamed slot.</b> Slot for the left-aligned content consisting of buttons, dropdowns, links, etc.
 * @slot hamburger - Slot for the hamburger button for opening the mobile menu.
 * @slot title - Slot for the title.
 * @slot end - Slot for the end (right side) of the header.
 */
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
      <Host class="tds-header__header">
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
