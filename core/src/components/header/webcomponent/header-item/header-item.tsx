import { Component, Element, h, Host, Prop } from '@stencil/core';
import { dfs } from '../../../../utils/utils';

@Component({
  tag: 'sdds-header-item',
  styleUrl: 'header-item.scss',
  shadow: true,
})
export class HeaderItem {
  @Element() host: HTMLElement;

  /** If the button should appear active. Can be used when the button is
   * triggering a dropdown, and the dropdown is open, for example. */
  @Prop() active: boolean = false;

  /** If the button should appear selected. */
  @Prop() selected: boolean = false;

  private slotEl: HTMLSlotElement;

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
      const addIconClass = (element) => element.classList.add('__sdds-header-item-icon');
      this.updateSlotted(isIconOrSvg, addIconClass);

      const isImage = (element) => element.tagName.toLowerCase() === 'img';
      const addImageClass = (element) => element.classList.add('__sdds-header-item-image');
      this.updateSlotted(isImage, addImageClass);
    }
  }

  componentDidLoad() {
    this.slotEl = this.host.shadowRoot.querySelector('slot');
    this.updateSlottedElements();
    this.slotEl.addEventListener('slotchange', this.updateSlottedElements);
  }

  render() {
    return (
      <Host>
        <sdds-core-header-item
          class={{
            'component-active': this.active,
            'component-selected': this.selected,
          }}
        >
          <slot></slot>
        </sdds-core-header-item>
      </Host>
    );
  }
}
