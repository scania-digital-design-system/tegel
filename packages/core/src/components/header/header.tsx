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
    console.log('TdsHeader: constructor');

    const callback: MutationCallback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          console.log('TdsHeader: Mutation observed - childList changed');
          updateListChildrenRoles(mutation.target);
        }
      });
    };

    this.observer = new MutationObserver(callback);
  }

  componentDidLoad() {
    console.log('TdsHeader: componentDidLoad');
    const defaultSlot = this.host.shadowRoot.querySelector('slot:not([name])');
    this.observer.observe(defaultSlot, {
      childList: true,
      subtree: true,
    });
    updateListChildrenRoles(defaultSlot);
  }

  disconnectedCallback() {
    console.log('TdsHeader: disconnectedCallback');
    this.observer.disconnect();
  }

  render() {
    console.log('TdsHeader: render');

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
