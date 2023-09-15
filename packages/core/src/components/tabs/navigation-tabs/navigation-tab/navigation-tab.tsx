import { Component, Host, h, Prop, State, Method } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tab link or button.
 */
@Component({
  tag: 'tds-navigation-tab',
  styleUrl: 'navigation-tab.scss',
  shadow: true,
})
export class TdsNavigationTab {
  /** Disables the Tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  /** @internal Method to set the Tab as selected. Used by the <tds-navigation-tabs> */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
  }

  render() {
    return (
      <Host role="listitem">
        <div
          class={`navigation-tab-item  ${this.selected ? 'selected' : ''}
           ${this.disabled ? 'disabled' : ''}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
