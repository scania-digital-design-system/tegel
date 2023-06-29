import { Component, Host, h, Listen, Element, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

/**
 * @slot - UNNAMED-SLOT - Used for injection of tds-side-menu-dropdown-list-item subcomponent
 * */
@Component({
  tag: 'tds-side-menu-dropdown-list',
  styleUrl: 'side-menu-dropdown-list.scss',
  shadow: true,
})
export class TdsSideMenuDropdownList {
  @Element() host: HTMLElement;

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLTdsSideMenuElement;

  @Listen('internalTdsSideMenuPropChange', { target: 'body' })
  collapsedSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
  }

  render() {
    return (
      <Host role="list">
        <div
          class={{
            'state-collapsed': this.collapsed,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
