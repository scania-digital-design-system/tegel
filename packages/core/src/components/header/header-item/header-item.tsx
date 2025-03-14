import { Component, Element, h, Host, Prop } from '@stencil/core';
import dfs from '../../../utils/dfs';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link or button element.
 */
@Component({
  tag: 'tds-header-item',
  styleUrl: 'header-item.scss',
  shadow: true,
})
export class TdsHeaderItem {
  @Element() host: HTMLElement;

  /** If the button should appear active. Can be used when the button is
   * triggering a dropdown, and the dropdown is open, for example. */
  @Prop() active: boolean = false;

  /** If the button should appear selected. */
  @Prop() selected: boolean = false;

  private slotEl: HTMLSlotElement;

  private mutationObserver: MutationObserver;

  updateSlotted(
    searchPredicate: (element: HTMLElement) => boolean,
    mutationCallback: (element: HTMLElement) => void,
  ) {
    const assignedElements = this.slotEl.assignedElements({ flatten: true });
    const firstSlottedElement = assignedElements[0] as HTMLElement;
    if (firstSlottedElement) {
      const foundElement = dfs(firstSlottedElement, searchPredicate);
      if (foundElement) {
        mutationCallback(foundElement);
      }
    }
  }

  /**
   * This function is needed because we can't use CSS selectors to style something in the light dom
   */
  updateSlottedElements() {
    if (this.slotEl) {
      const isIconOrSvg = (element) =>
        element.tagName.toLowerCase() === 'tds-icon' || element.tagName.toLowerCase() === 'svg';
      const addIconClass = (element) => element.classList.add('__tds-header-item-icon');
      this.updateSlotted(isIconOrSvg, addIconClass);

      const isImage = (element) => element.tagName.toLowerCase() === 'img';
      const addImageClass = (element) => element.classList.add('__tds-header-item-image');
      this.updateSlotted(isImage, addImageClass);
    }
  }

  /**
   * Read the native "order" attribute on the host and update the CSS order accordingly.
   * If the attribute "order" has the value "end", the order is set to 1. Otherwise, 0.
   */
  updateOrder() {
    const orderValue = this.host.getAttribute('order');
    switch (orderValue) {
      case 'end':
        this.host.style.order = '1';
        break;
      case 'start':
      case null:
      default:
        this.host.style.order = '0';
        break;
    }
  }

  componentDidLoad() {
    this.slotEl = this.host.shadowRoot.querySelector('slot');
    this.updateSlottedElements();
    this.slotEl.addEventListener('slotchange', this.updateSlottedElements);

    // Set the order on initial load.
    this.updateOrder();

    // Create a MutationObserver to listen for changes on the "order" attribute.
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'order') {
          this.updateOrder();
        }
      });
    });

    // Start observing the host element for attribute changes (specifically "order").
    this.mutationObserver.observe(this.host, {
      attributes: true,
      attributeFilter: ['order'],
    });
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  render() {
    return (
      <Host>
        <tds-core-header-item
          class={{
            'component-active': this.active,
            'component-selected': this.selected,
          }}
        >
          <slot></slot>
        </tds-core-header-item>
      </Host>
    );
  }
}
