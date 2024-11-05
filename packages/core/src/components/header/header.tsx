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

  private handleSlotChange(): void {
    console.log('TdsHeader: handleSlotChange called');
    this.applyNameEnd();
  }

  componentDidLoad() {
    console.log('TdsHeader: componentDidLoad');

    const hostElement = this.host;
    const navElement = hostElement.querySelector('.tds-header-component-list');

    this.observer.observe(navElement, {
      childList: true,
      subtree: false,
    });

    updateListChildrenRoles(navElement);
  }

  private applyNameEnd() {
    console.log('TdsHeader: applyNameEnd called');
    // Any additional code for `applyNameEnd` can go here
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
            <slot name="start"></slot>
            <li class="tds-header-middle-spacer"></li>
            <slot onSlotchange={() => this.handleSlotChange()} name="end"></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
