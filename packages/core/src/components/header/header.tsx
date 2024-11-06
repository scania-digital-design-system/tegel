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
  shadow: true,
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
    // Access the default slot from the light DOM
    const defaultSlot = this.host.querySelector('slot:not([name])');

    // Ensure the defaultSlot exists
    if (defaultSlot) {
      this.observer.observe(defaultSlot, {
        childList: true,
        subtree: true,
      });
      updateListChildrenRoles(defaultSlot);
    } else {
      console.warn('Default slot not found in tds-header component.');
    }
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
