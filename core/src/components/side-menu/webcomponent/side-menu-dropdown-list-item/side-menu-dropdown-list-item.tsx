import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

@Component({
  tag: 'sdds-side-menu-dropdown-list-item',
  styleUrl: 'side-menu-dropdown-list-item.scss',
  shadow: true,
})
export class SideMenuDropdownListItem {
  @Element() host: HTMLElement;

  /** If the item should appear selected. */
  @Prop() selected: boolean = false;

  @State() dropdownHasIcon: boolean = false;

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLSddsSideMenuElement;

  @Listen('internalSddsSideMenuPropChange', { target: 'body' })
  collapseSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  connectedCallback() {
    this.sideMenuEl = this.host.closest('sdds-side-menu');
  }

  componentDidLoad() {
    const dropdownEl = this.host.closest('sdds-side-menu-dropdown');
    const dropdownBtnIconSlotEl = dropdownEl.shadowRoot.querySelector(
      'slot[name="button-icon"]',
    ) as HTMLSlotElement;
    const btnIconSlottedEls = dropdownBtnIconSlotEl.assignedElements();
    const hasBtnIcon = btnIconSlottedEls?.length > 0;
    const btnIconIsUserImage =
      btnIconSlottedEls?.[0]?.tagName.toLowerCase() === 'sdds-side-menu-user-image';

    if (hasBtnIcon && !btnIconIsUserImage) {
      this.dropdownHasIcon = true;
    }
  }

  render() {
    return (
      <Host role="listitem">
        <div
          class={{
            'component': true,
            'component-selected': this.selected,
            'component-dropdown-has-icon': this.dropdownHasIcon,
            'component-collapsed': this.collapsed,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
