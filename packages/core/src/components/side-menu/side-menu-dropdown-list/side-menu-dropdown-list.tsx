import { Component, Host, h, Listen, Element, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';
import { findClosestComponent } from '../../../utils/findClosestComponent';

/**
 * @slot <default>  - <b>Unnamed slot.</b> For injection of <code>tds-side-menu-dropdown-list-item</code> subcomponents.
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
    this.sideMenuEl = findClosestComponent(this.host, 'tdsSideMenu') as HTMLTdsSideMenuElement;
    this.collapsed = this.sideMenuEl?.collapsed;
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
